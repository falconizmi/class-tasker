import { z } from "zod";

export const UserTypeEnum = z.enum(["student", "teacher"]);
export type UserTypeEnum = z.infer<typeof UserTypeEnum>;

export const RegisterSchema = z.object({
  firstName: z.string().min(1, "Missing first name"),
  lastName: z.string().min(1, "Missing last name"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
  userType: UserTypeEnum,
});

export type Register = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});

export type Login = z.infer<typeof LoginSchema>;

export const SessionSchema = z.object({
  logged_in: z.boolean(),
});

export type Session = z.infer<typeof SessionSchema>;