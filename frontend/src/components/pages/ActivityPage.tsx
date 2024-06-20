import { useQuery } from "@tanstack/react-query";
import React from "react";
import ActivityItem from "../Activity/ActivityItem";
import { Activity } from "../../models/activity";
import { fetchActivities } from "../../api/activityApi";
import { Result } from "@badrap/result";
import { DataTable } from "../Activity/data-table";
import { columns } from "../Activity/columns";
import AppActions from "../AppActions";
import { useActivitiesClassId } from "@/utils/activityUtils";
import { User } from "@/models/user";
import { UserTypeEnum } from "@/models/user";


function ActivityPage({user, classPage}:{user: User, classPage: string}) {
  const { activities, isLoading, isError } = useActivitiesClassId(classPage);

  if (isLoading) {
    return <div>Wating</div>;
  }

  if (isError) {
    return <div>Error occured</div>;
  }

  if (!activities) {
    console.log(activities);
    return <div>Error occured in data</div>;
  }

  return (
    <div className="container">
      {user.userType === UserTypeEnum.Values.teacher ? <AppActions classId={classPage}/> : <div></div> }
      
      <div className="mx-auto py-10"> 
        <DataTable columns={columns} data={activities} />
      </div>
    </div>
  );
}

export default ActivityPage;
