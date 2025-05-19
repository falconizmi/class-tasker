import { z } from "zod";

export const ClassSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Missing name"),
  code: z.string().min(1, "Missing code"),
});

export type Class_ = z.infer<typeof ClassSchema>;

export const ClassWithoutIdSchema = z.object({
  name: z.string().min(1, "Missing name"),
  code: z.string().min(1, "Missing code"),
});

export type ClassWithoutId = z.infer<typeof ClassWithoutIdSchema>;
export const ClassFormSchema = ClassWithoutIdSchema;
export type ClassForm = z.infer<typeof ClassWithoutIdSchema>;

export const ClassFetchSchema = z.object({
  status: z.string(),
  data: z
    .object({
      id: z.string().uuid(),
      name: z.string().min(1, "Missing name"),
      code: z.string().min(1, "Missing code"),
    })
    .array(),
});

export type ClassFetch = z.infer<typeof ClassFetchSchema>;
