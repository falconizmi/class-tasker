import AddActivityModal from "@/components/modals/AddActivityModal";


function AppActions({classroom_id}: {classroom_id: string}) {
    return (
        <div className="flex ">
          <AddActivityModal classroom_id={classroom_id} />
        </div>
      );
}

export default AppActions;
