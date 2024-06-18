import { useQuery } from "@tanstack/react-query";
import { fetchActivities } from "@/api/activityApi";
import { Activity } from "@/models/activity";
import { Result } from "@badrap/result";

export function useActivitiesClassId(classId: string | undefined) {
  const { data, isLoading, isError } = useQuery<Result<Activity[]>>({
    queryKey: ["activities"],
    queryFn: fetchActivities,
  });

  if (isLoading) {
    console.log("Waiting");
    return { activities: null, isLoading, isError };
  }

  if (isError || !data) {
    console.log("Error occurred");
    return { activities: null, isLoading, isError };
  }

  if (data.isErr) {
    console.log("Error occurred in data");
    console.log(data.error);
    return { activities: null, isLoading, isError };
  }

  if (!classId) {
    console.log("No class specified");
    return { activities: [], isLoading, isError };
  } 

  const activities = data.value.filter((activity) => activity.classId === classId);
  return { activities, isLoading, isError };
}

export function useActivityByActivityId(id: string) {
  const { data, isLoading, isError } = useQuery<Result<Activity[]>>({
    queryKey: ["activities"],
    queryFn: fetchActivities,
  });

  if (isLoading) {
    console.log("Waiting");
    return { activity: null, isLoading, isError };
  }

  if (isError || !data) {
    console.log("Error occurred");
    return { activity: null, isLoading, isError };
  }

  if (data.isErr) {
    console.log("Error occurred in data");
    console.log(data.error);
    return { activity: null, isLoading, isError };
  }

  const activity = data.value.find((activity) => activity.id === id);
  return { activity, isLoading, isError };
}