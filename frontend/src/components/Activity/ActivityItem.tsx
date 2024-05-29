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
      <p>name:{name} desc:{description} date:{date.getDay()}.{date.getMonth()}.{date.getFullYear()} type:  {activityType}</p>
    </div>
  )
}

export default ActivityItem

