import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

// import styles from "../../styles/modules/modal.module.css";
// import stylesButton from "../../styles/modules/button.module.css";
// import { MdOutlineClose } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postActivities } from "../../api/activityApi";
import {
  ActivityEnum,
  ActivityWithId,
  ActivityWithIdSchema,
} from "../../models/activity";

import { Button } from "@/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
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
import { DateTimePicker } from "../DatePicker/date-time-picker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";

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

import { z } from "zod";

import { toast } from "@/components/shadcn/use-toast";

import { v4 as uuid } from "uuid";

function ActivityModal() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (activity: ActivityWithId) => {
      return await postActivities({
        id: uuid(),
        ...activity,
      });
    },
  });

  const onSubmit = async (activity: ActivityWithId) => {
    console.log("SUBMITTED");
    mutation.mutate(activity);
    queryClient.invalidateQueries({ queryKey: ["activities"] });
    console.log(activity.date)
    setOpen(false);

    resetFields()

  };

  const resetFields = async() => {
    form.resetField("name");
    form.resetField("description")
    form.resetField("date")
    form.resetField("activityType")
  }

  const form = useForm<ActivityWithId>({
    resolver: zodResolver(ActivityWithIdSchema),
  });

  useEffect(() => {
    if (form.formState.isSubmitted && !form.formState.isValid) {
      console.log(form.formState.errors);
      console.log(form.formState.dirtyFields);
    }
  }, [form.formState.submitCount]);

  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add task</DialogTitle>
              <DialogDescription>
                Fill out the fields to add task.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" value={field.value || ""} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" value={field.value || ""} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-left">DateTime</FormLabel>
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm:ss")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <TimePickerDemo
                            setDate={field.onChange}
                            date={field.value}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="activityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={ActivityEnum.Values.task}>
                          task
                        </SelectItem>
                        <SelectItem value={ActivityEnum.Values.event}>
                          event
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex !justify-between">
              <Button type="submit">Add</Button>
              <Button onClick={() => {resetFields();setOpen(false)}}type="button">Cancel</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ActivityModal;
