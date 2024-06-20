import React, { useState } from "react";
import ActivityPage from "./pages/ActivityPage";
import AppSideBar from "./AppSideBar";
import PageTitle from "@/components/shadcn/page-title";
import { useClassByClassId } from "@/utils/classUtils";
import { User } from "@/models/user";

function AppContent({user}: {user: User}) {
  const [classPage, setClassPage] = useState<string | undefined>(undefined);
  const { class_, isLoading, isError } = useClassByClassId(classPage);

  return (
    <div>
      <PageTitle
        title={
          isLoading
            ? "Waiting"
            : isError
            ? "Error occurred"
            : classPage === undefined || class_ === undefined || class_ === null
            ? "No class chosen"
            : class_.name
        }
      />
      <div className="flex">
        <AppSideBar setClassPage={setClassPage} user={user} />
        <div className="w-full overflow-x-auto">
          <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
            <div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
              <div className="w-full md:max-w-6xl">
                {!class_ 
                  ? <div className="text-center">First join class</div>
                  : <ActivityPage user={user} classPage={class_.id} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppContent;
