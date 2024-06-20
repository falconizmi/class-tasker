import { Book, LayoutGrid, PlayCircle, Radio } from "lucide-react"; // Adjust the import according to your project setup
import { Button } from "@/components/shadcn/button";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import { Class_ } from "@/models/class";
import { Dispatch, SetStateAction } from "react";
import { User } from "@/models/user";
import { useClassesByUser } from "@/utils/classUtils";
import ClassActions from "@/components/Class/ClassActions";
import CreateClassModal from "./modals/CreateClassModal";
import JoinClassModal from "./modals/JoinClassModal";

function AppSideBar({
  setClassPage,
  user,
}: {
  setClassPage: Dispatch<SetStateAction<string | undefined>>;
  user: User;
}) {
  //todo onclick in button
  const { classes, isLoading, isError } = useClassesByUser(user);

  if (isLoading) {
    return <div>Wating</div>;
  }

  if (isError) {
    return <div>Error occured</div>;
  }

  console.log("Show classes in side bar");
  return (
    <div className="flex flex-col">
      <CreateClassModal />
      <JoinClassModal userId={user.id} />
      <div className="pb-12 mx-auto py-10">
        <h2 className="relative px-6 text-lg font-semibold tracking-tight">
          Classes
        </h2>
        <ScrollArea className="h-[300px] bg-gray-100 px-2">
          <div className="space-y-1 p-2">
            {classes?.map((classItem) => (
              <div key={classItem.id} className="flex">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-normal"
                  onClick={() => setClassPage(classItem.id)}
                >
                  <Book className="mr-2 h-4 w-4" />
                  {classItem.name}
                </Button>
                <ClassActions
                  classId={classItem.id}
                  userId={user.id}
                ></ClassActions>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default AppSideBar;
