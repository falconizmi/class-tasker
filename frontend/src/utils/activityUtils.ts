import { useQuery } from "@tanstack/react-query";
import { fetchActivities } from "@/api/activityApi"; // Make sure this function is correctly implemented
import { Activity } from "@/models/activity";
import { Result } from "@badrap/result";

export function useActivity(id: string) {
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