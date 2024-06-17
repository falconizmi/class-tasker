import { z } from "zod";

export const UserTypeEnum = z.enum(["student", "teacher"]);
export type UserTypeEnum = z.infer<typeof UserTypeEnum>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1, "Missing first name"),
  lastName: z.string().min(1, "Missing last name"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
  userType: UserTypeEnum,
});

export type User = z.infer<typeof UserSchema>;

export const UserWithoutIdSchema = z.object({
  firstName: z.string().min(1, "Missing first name"),
  lastName: z.string().min(1, "Missing last name"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
  userType: UserTypeEnum,
});

export type UserWithoutId = z.infer<typeof UserWithoutIdSchema>;

export const UserFetchSchema = z.object({
    users: z.object({
        id: z.string().uuid(),
        firstName: z.string().min(1, "Missing first name"),
        lastName: z.string().min(1, "Missing last name"),
        email: z.string().email("Invalid email"),
        password: z.string().min(6, "Password too short"),
        userType: UserTypeEnum,
    }).array(),
  });
  
  export type UserFetch = z.infer<typeof UserFetchSchema>;