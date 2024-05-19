import { z } from "zod";
import { baseApi } from ".";
import { ActivitySchema } from "../models/activity";

export const postTask = async () => {
  const request = {
    name: "test",
    decription: "test",
    date: new Date(),
    activityType: "task",
  };

  const data = await baseApi.post("/create_activity", request);
};

const getTaskResponse = z.object({
  data: z.array(ActivitySchema),
});

export const getTasks = async () => {
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
