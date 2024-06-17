import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});

export type Login = z.infer<typeof LoginSchema>;

export const SessionSchema = z.object({
  logged_in: z.boolean(),
});

export type Session = z.infer<typeof SessionSchema>;