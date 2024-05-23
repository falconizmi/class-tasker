import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

// import styles from "../../styles/modules/modal.module.css";
// import stylesButton from "../../styles/modules/button.module.css";
// import { MdOutlineClose } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postActivities } from "../../api/activityApi";
import { Activity, ActivitySchema } from "../../models/activity";

import { Button } from "@/components/shadcn/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"


function ActivityModal({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (activity: Activity) => {
      return await postActivities({
        ...activity,
        id: "1",
      });
    },
  });

  const onSubmit = async (activity: Activity) => {
    console.log("SUBMITTED");
    mutation.mutate(activity);
    queryClient.invalidateQueries({ queryKey: ["activities"] });
    setModalOpen(false);
  };

  const form = useForm<Activity>({
    resolver: zodResolver(ActivitySchema),
  });

  const [submitValue, setSubmitValue] = useState('Save');


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  // return (
  //   modalOpen && (
  //     <div className={styles.wrapper}>
  //       <div className={styles.container}>
  //         <div
  //           className={styles.closeButton}
  //           onClick={() => setModalOpen(false)}
  //           onKeyDown={() => setModalOpen(false)}
  //           tabIndex={0}
  //           role="button"
  //         >
  //           <MdOutlineClose />
  //         </div>
  //         <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
  //           <h1 className={styles.formTitle}>Add task</h1>
  //           {/* name */}
  //           <label htmlFor="name">
  //             Name
  //             <input
  //               id="name"
  //               type="text"
  //               {...form.register("name", { required: "Fill out name" })}
  //             />
  //             {form.formState.errors.name && <span>This is required</span>}
  //           </label>
  //           {/* description */}
  //           <label htmlFor="description">
  //             Description
  //             <input
  //               type="text"
  //               id="description"
  //               {...form.register("description", {
  //                 required: "Fill out description",
  //               })}
  //             />
  //             {form.formState.errors.description && (
  //               <span>This is required</span>
  //             )}
  //           </label>
  //           {/* date */}
  //           <label htmlFor="date">
  //             date
  //             <input
  //               type="datetime-local"
  //               id="date"
  //               {...form.register("date", { required: "Fill out date" })}
  //             />
  //             {form.formState.errors.date && <span>This is required</span>}
  //           </label>
  //           {/* activityType */}
  //           <label htmlFor="activityType">
  //             Activity type
  //             <select {...form.register("activityType", { required: "Fill out activity type" })}>
  //               <option value="task">task</option>
  //               <option value="event">event</option>
  //             </select>
  //             {form.formState.errors.activityType && (
  //               <span>This is required</span>
  //             )}
  //           </label>

  //           {/* submit */}
  //           <div className={styles.buttonContainer}>
  //             <button className={stylesButton.button}>
  //               <input type="submit" value={submitValue} onChange={e => setSubmitValue(e.target.value)}/>
  //             </button>
  //             <button
  //               type="button"
  //               className="secondary-button"
  //               onClick={() => setModalOpen(false)}
  //             >
  //               Cancel
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   )
  // );
}

export default ActivityModal;
