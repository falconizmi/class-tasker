import { useQuery } from '@tanstack/react-query';
import React from 'react'
import ActivityItem from '../Activity/ActivityItem';
import { Activity } from '../../models/activity';
import { fetchActivities } from '../../api/activityApi';

function ActivityPage() {
    const activities = useQuery<Activity[]>({
        queryKey: ["activities"],
        queryFn: fetchActivities,
      });


    if (activities.isLoading || !activities.data) {
      return <div>Wating</div>;
    }
  
    if (activities.isError) {
      return <div>Error occured</div>;
    }

  return (
    <div>
      {activities.data?.map((activityItem) => (
            <ActivityItem key={activityItem.id} {...activityItem} />
          ))}
    </div>
  )
}

export default ActivityPage
