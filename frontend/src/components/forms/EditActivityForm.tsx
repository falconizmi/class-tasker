import { Dispatch, SetStateAction} from 'react';

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
import { useActivityByActivityId } from '@/utils/activityUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
    ActivityEnum,
    ActivityForm,
    ActivityFormSchema,
  } from '@/models/activity';


  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { updateActivity } from "@/api/activityApi";

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/shadcn/select";
  
  import { format } from "date-fns";
  import { Calendar as CalendarIcon } from "lucide-react";
  import { cn } from "@/lib/utils";
  import { Calendar } from "@/components/shadcn/calendar";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/shadcn/popover";
  import { TimePickerDemo } from "@/components/shadcn/time-picker-demo";

export default function EditForm({
  activityId,
  setIsOpen,
}: {
  activityId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const { activity: readActivity, isLoading: isActivityLoading, isError } = useActivityByActivityId(activityId);
  
  const mutation = useMutation({
    mutationFn: async (activity: ActivityForm) => {
      if (readActivity) {
        return await updateActivity({
          id: readActivity.id,
          ...activity,
          class_id: readActivity.class_id,
        });
      }
      throw new Error("Activity not found");
    },
  });

  const form = useForm<ActivityForm>({
    resolver: zodResolver(ActivityFormSchema),
    defaultValues: {
      name: readActivity?.name,
      date: readActivity?.date,
      activity_type: readActivity?.activity_type,
      description: readActivity?.description,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (activity: ActivityForm) => {
    try {
      console.log("SUBMITTED");
      mutation.mutate(activity);
      queryClient.invalidateQueries({ queryKey: ["activities", readActivity?.id], refetchType:"all" });
      console.log(activity.date)
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isActivityLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading activity</div>;
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
          name="description"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Description"
                  className="text-md"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="date"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="flex flex-col col-span-2 md:col-span-1">
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
          name="activity_type"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Activity type</FormLabel>
              <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue 
                          {...field}
                  placeholder="Select activity type"
                  required />
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