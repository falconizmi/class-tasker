import { useQuery } from '@tanstack/react-query';
import React from 'react'
import ActivityItem from '../Activity/ActivityItem';
import { Activity } from '../../models/activity';
import { fetchActivities } from '../../api/activityApi';
import { Result } from '@badrap/result';
import { DataTable } from '../Activity/data-table';
import { columns } from '../Activity/columns';

function ActivityPage() {
    const activities = useQuery<Result<Activity[]>>({
        queryKey: ["activities"],
        queryFn: fetchActivities,
      });


    if (activities.isLoading || !activities.data) {
      return <div>Wating</div>;
    }
  
    if (activities.isError) {
      return <div>Error occured</div>;
    }

    if (activities.data.isErr) {
      console.log(activities.data.error)
      return <div>Error occured in data</div>;
    }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={activities.data.value} />
    </div>
    // <div>
    //   {activities.data.value?.map((activityItem) => (
    //         <ActivityItem key={activityItem.id} {...activityItem} />
    //       ))}
    //       <p>WHERE CONTENT?</p>
    //       {/* <p>{dataA}</p> */}
    // </div>
  )
}

export default ActivityPage
