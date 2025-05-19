import { Book} from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import { Dispatch, SetStateAction } from "react";
import { User } from "@/models/user";
import { useClassesByUser } from "@/utils/classUtils";
import ClassActions from "@/components/Classroom/ClassActions";
import CreateClassModal from "./modals/CreateClassModal";
import JoinClassModal from "./modals/JoinClassModal";
import { UserTypeEnum } from "@/models/user";

function AppSideBar({
  setClassPage,
  user,
}: {
  setClassPage: Dispatch<SetStateAction<string | undefined>>;
  user: User;
}) {
  //todo onclick in button
  const { classrooms, isLoading, isError } = useClassesByUser(user);

  if (isLoading) {
    return <div>Wating</div>;
  }

  if (isError) {
    return <div>Error occured</div>;
  }

  console.log("Show classrooms in side bar");
  return (
    <div className="flex flex-col">
      
      <div className="grid justify-items-center">
      
      {user.user_type === UserTypeEnum.Values.teacher ? <CreateClassModal /> : <div></div> }
      <div className="py-4"><JoinClassModal userId={user.id} /> </div>
      </div>
      
      <div className="pb-12 mx-auto">
        <h2 className="relative px-6 text-lg font-semibold tracking-tight">
          Classrooms
        </h2>
        <ScrollArea className="h-[300px] bg-gray-100 px-2">
          <div className="space-y-1 p-2">
            {classrooms?.map((classItem) => (
              <div key={classItem.id} className="flex">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-normal"
                  onClick={() => setClassPage(classItem.id)}
                >
                  <Book className="mr-2 h-4 w-4" />
                  {classItem.code}
                </Button>
                <ClassActions
                  class_id={classItem.id}
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
