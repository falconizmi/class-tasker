import { useState } from "react";

import EditForm from "@/components/forms/EditActivityForm";
import { ResponsiveDialog } from "@/components/shadcn/responsive-dialog";
import { Button } from "@/components/shadcn/button";
import { SquarePen,  } from "lucide-react";
import IconMenu from "@/utils/iconMenu";

function EditActivityModal(activityId: string) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Activity"
      >
        <EditForm activityId={activityId} setIsOpen={setIsEditOpen} />
      </ResponsiveDialog>
      <Button
        onClick={() => {
          setIsEditOpen(true);
        }}
        className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
      >
        <IconMenu text="Edit" icon={<SquarePen className="h-4 w-4" />} />
      </Button>
    </>
  );
}

export default EditActivityModal;
