import { z } from "zod";

export const ActivityEnum = z.enum(["task", "event"]);
type ActivityEnum = z.infer<typeof ActivityEnum>;

export const ActivitySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Missing name"),
  description: z.string().optional(),
  date: z.coerce.date(),
  activityType: ActivityEnum,
  classId: z.string().uuid(),
});

export type Activity = z.infer<typeof ActivitySchema>;

export const ActivityWithoutIdSchema = z.object({
  name: z.string().min(1, "Missing name"),
  description: z.string().optional(),
  date: z.coerce.date(),
  activityType: ActivityEnum,
  classId: z.string().uuid(),
});

export type ActivityWithoutId = z.infer<typeof ActivityWithoutIdSchema>;

export const ActivityFetchSchema = z.object({
  activities: z.object({
    id: z.string().uuid(),
    name: z.string().min(1, "Missing name"),
    description: z.string().optional(),
    date: z.coerce.date(),
    activityType: ActivityEnum,
    classId: z.string().uuid(),
  }).array(),
});

export type ActivityFetch = z.infer<typeof ActivityFetchSchema>;
