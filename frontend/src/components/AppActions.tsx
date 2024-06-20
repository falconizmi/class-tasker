import AddActivityModal from "@/components/modals/AddActivityModal";


function AppActions({classId}: {classId: string}) {
    return (
        <div className="flex ">
          <AddActivityModal classId={classId} />
        </div>
      );
}

export default AppActions;
