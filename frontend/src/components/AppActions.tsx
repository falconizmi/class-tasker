import AddActivityModal from "@/components/modals/AddActivityModal";


function AppActions({class_id}: {class_id: string}) {
    return (
        <div className="flex ">
          <AddActivityModal class_id={class_id} />
        </div>
      );
}

export default AppActions;
