import { z } from "zod";
import { baseApi } from ".";
import { Activity, ActivityFetchSchema, ActivitySchema } from "../models/activity";
import { Result } from "@badrap/result";


// const getTaskResponse = z.object({
//   data: z.array(ActivityFetchSchema),
// });

export const fetchActivities = async (): Promise<Result<Activity[]>> => {
  const data = await baseApi.get("/get_activities");
  const request = ActivityFetchSchema.safeParse(data);
  // const requestToPrint = ActivityFetchSchema.parse(data);

  if (!request.success) {
    // console.log(requestToPrint)
    return Result.err(new Error("Response is of unexpected structure!"));
  }

  const requestBody = await ActivityFetchSchema.safeParseAsync(request.data["activities"]);
  if (!requestBody.success) {
    return Result.err(new Error("Parsing data failed!\n" + requestBody.error.message));
  }

  return Result.ok(request.data["activities"]);
};

export const postActivities = async (activity: Activity): Promise<void> => {
  const data = await baseApi.post("/create_activity", activity, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(data);
};
