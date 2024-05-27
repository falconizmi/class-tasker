import { z } from "zod"

export const ActivityEnum = z.enum(["task", "event"]);
type ActivityEnum = z.infer<typeof ActivityEnum>;

export const ActivitySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, "Missing name"),
    description: z.string().optional(),
    date: z.coerce.date(),
    activityType: ActivityEnum
})

export type Activity = z.infer<typeof ActivitySchema>

export const ActivityWithIdSchema = z.object({
    name: z.string().min(1, "Missing name"),
    description: z.string().optional(),
    date: z.coerce.date(),
    activityType: ActivityEnum
})

export type ActivityWithId = z.infer<typeof ActivityWithIdSchema>