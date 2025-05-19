import { useState } from "react";

import AddActivityForm from "@/components/forms/AddActivityForm";
import { ResponsiveDialog } from "@/components/shadcn/responsive-dialog";
import { Button } from "@/components/shadcn/button";
import { SquarePen } from "lucide-react";
import IconMenu from "@/utils/iconMenu";

function AddActivityModal({ class_id }: { class_id: string }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  return (
    <>
      <ResponsiveDialog
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        title="Add Activity"
      >
        <AddActivityForm class_id={class_id} setIsOpen={setIsAddOpen} />
      </ResponsiveDialog>
        <Button
          onClick={() => {
            setIsAddOpen(true);
          }}
          className="justify-start flex rounded-md p-4 transition-all duration-75 "
        >
          <IconMenu text="Add" icon={<SquarePen className="h-4 w-4" />} />
        </Button>
    </>
  );
}

export default AddActivityModal;
