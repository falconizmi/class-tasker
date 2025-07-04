import React, { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/shadcn/button";
import { Form } from "@/components/shadcn/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useActivityByActivityId } from "@/utils/activityUtils";
import { deleteActivity } from "@/api/activityApi";
import { leaveClass } from "@/api/classApi";

const formSchema = z.object({
    class_id:  z.string(),
  userId: z.string(),
});

export default function LeaveClassForm({
  class_id,
  userId,
  setIsOpen,
}: {
  class_id: string;
  userId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
        return await leaveClass(userId, class_id);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      class_id: class_id,
      userId: userId
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async () => {
    try {
        console.log("SUBMITTED");
        mutation.mutate();
        queryClient.invalidateQueries({ queryKey: ["classrooms"], refetchType:"all" });

        setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6  sm:px-0 px-4"
      >
        <div className="w-full flex justify-center sm:space-x-6">
          <Button
            size="lg"
            variant="outline"
            disabled={isLoading}
            className="w-full hidden sm:block"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-500 hover:bg-red-400"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Leaving
              </>
            ) : (
              <span>Leave</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
