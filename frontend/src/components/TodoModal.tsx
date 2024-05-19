import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";

import styles from "../styles/modules/modal.module.css";
import { MdOutlineClose } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTask } from "../api/taskApi";
import { z } from "zod";

export const ActivitySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  date: z.coerce.date(),
});

export type Activity = z.infer<typeof ActivitySchema>;

function TodoModal({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  const form = useForm<Activity>({
    resolver: zodResolver(ActivitySchema),
  });

  const mutation = useMutation({
    mutationFn: async (activity: Activity) => {
      return await postTask({ ...activity, id: "1", activityType: "task" });
    },
  });

  const onSubmit = async (activity: Activity) => {
    console.log("SUBMITTED");
    mutation.mutate(activity);
    setModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["activities"] });
  };

  return (
    modalOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div
            className={styles.closeButton}
            onClick={() => setModalOpen(false)}
            onKeyDown={() => setModalOpen(false)}
            tabIndex={0}
            role="button"
          >
            <MdOutlineClose />
          </div>
          <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className={styles.formTitle}>Add task</h1>
            <label htmlFor="name">
              Name
              <input
                id="name"
                type="text"
                {...form.register("name", { required: "Fill out name" })}
              />
              {form.formState.errors.name && <span>This is required</span>}
            </label>
            <label htmlFor="description">
              Description
              <input
                type="text"
                id="description"
                {...form.register("description", {
                  required: "Fill out description",
                })}
              />
              {form.formState.errors.description && (
                <span>This is required</span>
              )}
            </label>
            <label htmlFor="date">
              date
              <input
                type="datetime-local"
                id="date"
                {...form.register("date", { required: "Fill out date" })}
              />
              {form.formState.errors.date && <span>This is required</span>}
            </label>
            <div className={styles.buttonContainer}>
              <button>
                <input type="submit" />
                Save
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default TodoModal;
