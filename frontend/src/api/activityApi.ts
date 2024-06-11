import { z } from "zod";
import { baseApi } from ".";
import {
  Activity,
  ActivityFetchSchema,
  ActivitySchema,
} from "../models/activity";
import { Result } from "@badrap/result";

// const getTaskResponse = z.object({
//   data: z.array(ActivityFetchSchema),
// });

export const fetchActivities = async (): Promise<Result<Activity[]>> => {
  const data = await baseApi.get("/activities");
  const request = ActivityFetchSchema.safeParse(data.data);
  // const requestToPrint = ActivityFetchSchema.parse(data);

  if (!request.success) {
    // console.log(requestToPrint)
    return Result.err(new Error("Response is of unexpected structure!"));
  }

  return Result.ok(request.data.activities);
};

export const postActivities = async (activity: Activity): Promise<void> => {
  const data = await baseApi.post("/activities", activity, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(data);
};
