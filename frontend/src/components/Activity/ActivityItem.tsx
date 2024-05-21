import React from 'react'
import { Activity } from '../../models/activity'

function ActivityItem({
    name,
    description,
    date,
    activityType,
}: Activity): React.JSX.Element  {
  return (
    <div>
      <p>{name}{description}{date.getDate()}{activityType}</p>
    </div>
  )
}

export default ActivityItem

