import { useState } from "react";

import CreateClassForm from "@/components/forms/CreateClassForm";
import { ResponsiveDialog } from "@/components/shadcn/responsive-dialog";
import { Button } from "@/components/shadcn/button";
import { SquarePen } from "lucide-react";
import IconMenu from "@/utils/iconMenu";

function CreateClassModal() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  return (
    <>
      <ResponsiveDialog
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
        title="Create Classroom"
      >
        <CreateClassForm setIsOpen={setIsCreateOpen} />
      </ResponsiveDialog>
        <Button
          onClick={() => {
            setIsCreateOpen(true);
          }}
          className="justify-start flex rounded-md p-4 transition-all duration-75 "
        >
          <IconMenu text="Create" icon={<SquarePen className="h-4 w-4" />} />
        </Button>
    </>
  );
}

export default CreateClassModal;
