import baseApi from "./index";
import { Register, RegisterSchema, Login, LoginSchema, SessionSchema } from "../models/auth";
import { Result } from "@badrap/result";

export const registerUser = async (user: Register): Promise<Result<void>> => {
  const response = await baseApi.post("/auth/register", user, {
    headers: { "Content-Type": "application/json" },
  });

  if (response.status !== 201) {
    return Result.err(new Error("Failed to register"));
  }

  return Result.ok(undefined);
};

export const loginUser = async (credentials: Login): Promise<Result<void>> => {
  const response = await baseApi.post("/auth/login", credentials, {
    headers: { "Content-Type": "application/json" },
  });

  if (response.status !== 200) {
    return Result.err(new Error("Invalid credentials"));
  }

  return Result.ok(undefined);
};

export const logoutUser = async (): Promise<Result<void>> => {
  const response = await baseApi.post("/auth/logout");

  if (response.status !== 200) {
    return Result.err(new Error("Failed to logout"));
  }

  return Result.ok(undefined);
};

export const checkUserSession = async (): Promise<Result<boolean>> => {
  const response = await baseApi.get("/auth/session");
  const parsed = SessionSchema.safeParse(response.data);

  if (!parsed.success) {
    return Result.err(new Error("Invalid session data"));
  }

  return Result.ok(parsed.data.logged_in);
};