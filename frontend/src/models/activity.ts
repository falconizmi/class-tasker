import { z } from "zod";

export const ActivityEnum = z.enum(["task", "event"]);
type ActivityEnum = z.infer<typeof ActivityEnum>;

export const ActivitySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Missing name"),
  description: z.string().optional(),
  date: z.coerce.date(),
  activity_type: ActivityEnum,
  class_id: z.string().uuid(),
});

export type Activity = z.infer<typeof ActivitySchema>;

export const ActivityFormSchema = z.object({
  name: z.string().min(1, "Missing name"),
  description: z.string().optional(),
  date: z.coerce.date(),
  activity_type: ActivityEnum,
});

export type ActivityForm = z.infer<typeof ActivityFormSchema>;

export const ActivityPostSchema = z.object({
  name: z.string().min(1, "Missing name"),
  description: z.string().optional(),
  date: z.coerce.date(),
  activity_type: ActivityEnum,
  class_id: z.string().uuid(),
});

export type ActivityPost = z.infer<typeof ActivityPostSchema>;

export const ActivityFetchSchema = z.object({
  status: z.string(),
  data: z
    .object({
      id: z.string().uuid(),
      name: z.string().min(1, "Missing name"),
      description: z.string().optional(),
      date: z.coerce.date(),
      activity_type: ActivityEnum,
      class_id: z.string().uuid(),
    })
    .array(),
});

export type ActivityFetch = z.infer<typeof ActivityFetchSchema>;
