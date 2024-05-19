import React from "react";

export type Activity = {
    id: string;
    name: string;
    description: string;
    date: Date;
    activityType: string;

  };

const ActivityList = ({activities}: { activities: Activity[] }) => {
    return (<div>
        <h2>Activites</h2>
        <table>
            <thead>
                <tr>
                    <th>Tasks</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {activities.map((activity) => (
                    <tr key={activity.id}>
                        <td>{activity.name}</td>
                        <td>
                            <button>Update</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default ActivityList