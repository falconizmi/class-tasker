import { z } from "zod";
import { baseApi } from ".";
import { Activity, ActivitySchema } from "../models/activity";


const getTaskResponse = z.object({
  data: z.array(ActivitySchema),
});

export const fetchActivities = async (): Promise<Activity[]> => {
  const data = await baseApi.get("/get_activities");
  const validation = getTaskResponse.safeParse(data);
  console.log(data);
  if (!validation.success) {
    // TODO: throw error
    return [];
  }

  const result = validation.data.data;
  return result;
};

export const postActivities = async (activity: Activity): Promise<void> => {
  const data = await baseApi.post("/create_activity", activity, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(data);
};
