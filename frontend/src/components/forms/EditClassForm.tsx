import React, { Dispatch, ReactNode, SetStateAction, useState, useEffect } from 'react';

import { Button } from '@/components/shadcn/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/form';
import { Input } from '@/components/shadcn/input';
import { Textarea } from '@/components/shadcn/textarea';
import { useClassByClassId } from '@/utils/classUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { v4 as uuid } from "uuid";
import {
    ClassForm,
    ClassFormSchema,
  } from '@/models/classroom';


  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { updateClass } from "@/api/classApi";

  
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/shadcn/dialog";
  import { Label } from "@/components/shadcn/label";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/shadcn/select";
  import { DateTimePicker } from "@/components/DatePicker/date-time-picker";
  
  import { format } from "date-fns";
  import { Calendar as CalendarIcon, Key } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { Calendar } from "@/components/shadcn/calendar";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/shadcn/popover";
  import { TimePickerDemo } from "@/components/shadcn/time-picker-demo";
  

  import { toast } from "@/components/shadcn/use-toast";
  

export default function EditClassForm({
  class_id,
  setIsOpen,
}: {
  class_id: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const { class_: readClass, isLoading: isClassLoading, isError } = useClassByClassId(class_id);
  
  const mutation = useMutation({
    mutationFn: async (class_: ClassForm) => {
      if (readClass) {
        return await updateClass({
          id: readClass.id,
          ...class_,
        });
      }
      throw new Error("Classroom not found");
    },
  });

  const form = useForm<ClassForm>({
    resolver: zodResolver(ClassFormSchema),
    defaultValues: {
      name: readClass?.name,
      code: readClass?.code,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (class_: ClassForm) => {
    try {
      console.log("SUBMITTED");
      mutation.mutate(class_);
      queryClient.invalidateQueries({ queryKey: ["classrooms"], refetchType:"all" });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isClassLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading class_</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 sm:px-0 px-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Name"
                  className="text-md"
                  required
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="code"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Code"
                  className="text-md"
                  required
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full sm:justify-end mt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            <>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </>
          </Button>
        </div>
      </form>
    </Form>
  );
}