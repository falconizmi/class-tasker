import { useState } from "react";

import JoinClassForm from "@/components/forms/JoinClassForm";
import { ResponsiveDialog } from "@/components/shadcn/responsive-dialog";
import { Button } from "@/components/shadcn/button";
import { SquarePen } from "lucide-react";
import IconMenu from "@/utils/iconMenu";

function JoinClassModal({userId} : {userId: string}) {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  return (
    <>
      <ResponsiveDialog
        isOpen={isJoinOpen}
        setIsOpen={setIsJoinOpen}
        title="Join Classroom"
      >
        <JoinClassForm userId={userId} setIsOpen={setIsJoinOpen} />
      </ResponsiveDialog>
        <Button
          onClick={() => {
            setIsJoinOpen(true);
          }}
          className="justify-start flex rounded-md p-4 transition-all duration-75 "
        >
          <IconMenu text="Join" icon={<SquarePen className="h-4 w-4" />} />
        </Button>
    </>
  );
}

export default JoinClassModal;
