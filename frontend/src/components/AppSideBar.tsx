import { Book, LayoutGrid, PlayCircle, Radio, User } from "lucide-react"; // Adjust the import according to your project setup
import { Button } from "@/components/shadcn/button";
import { ScrollArea } from "@/components/shadcn/scroll-area";
import { Class_ } from "@/models/class";

function ClassSideBar({ classes }: { classes: Class_[] }) {
    return (
      <div className="pb-12 bg-gray-100">
            <h2 className="relative px-6 text-lg font-semibold tracking-tight">
              Classes
            </h2>
            <ScrollArea className="h-[300px] px-2">
              <div className="space-y-1 p-2">
                {classes?.map((classItem) => (
                  <Button
                    key={classItem.id}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start font-normal"
                  >
                    <Book className="mr-2 h-4 w-4" />
                    {classItem.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
      </div>
    );
  }

  export default ClassSideBar