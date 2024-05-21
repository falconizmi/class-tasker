import { z } from "zod"

export const ActivitySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    activityType: z.string()
})

export type Activity = z.infer<typeof ActivitySchema>