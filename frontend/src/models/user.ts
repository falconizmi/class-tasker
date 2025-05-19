import { z } from "zod";

export const UserTypeEnum = z.enum(["student", "teacher"]);
export type UserTypeEnum = z.infer<typeof UserTypeEnum>;

export const EmailSchema = z.object({
  email: z.string().email("Invalid email"),
});

export type Email = z.infer<typeof EmailSchema>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().min(1, "Missing first name"),
  last_name: z.string().min(1, "Missing last name"),
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password too short"),
  user_type: UserTypeEnum,
});

export type User = z.infer<typeof UserSchema>;

export const UserWithoutIdSchema = z.object({
  first_name: z.string().min(1, "Missing first name"),
  last_name: z.string().min(1, "Missing last name"),
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password too short"),
  user_type: UserTypeEnum,
});

export type UserWithoutId = z.infer<typeof UserWithoutIdSchema>;

export const UserFetchSchema = z.object({
    status: z.string(),
    data: z.object({
        id: z.string().uuid(),
        first_name: z.string().min(1, "Missing first name"),
        last_name: z.string().min(1, "Missing last name"),
        email: z.string().email("Invalid email"),
        password: z.string().min(4, "Password too short"),
        user_type: UserTypeEnum,
    }).array(),
  });
  
  export type UserFetch = z.infer<typeof UserFetchSchema>;