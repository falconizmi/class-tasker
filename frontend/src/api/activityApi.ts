import { z } from "zod";
import { baseApi } from ".";
import {
  Activity,
  ActivityFetchSchema,
  ActivitySchema,
} from "../models/activity";
import { Result } from "@badrap/result";

export const fetchActivities = async (): Promise<Result<Activity[]>> => {
  const data = await baseApi.get("/activities");
  const request = ActivityFetchSchema.safeParse(data.data);

  if (!request.success) {
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

export const updateActivity = async (activity: Activity): Promise<void> => {
  const data = await baseApi.patch(`/activities/${activity.id}`, activity, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(data);
};

export const deleteActivity = async (activityId: string): Promise<void> => {
  const data = await baseApi.delete(`/activities/${activityId}`);
  console.log(data);
};