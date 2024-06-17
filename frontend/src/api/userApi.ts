import { z } from "zod";
import baseApi from "./index";
import {
  User,
  UserFetchSchema,
} from "../models/user";
import { Result } from "@badrap/result";

export const fetchUsers = async (): Promise<Result<User[]>> => {
  const data = await baseApi.get("/users");
  const request = UserFetchSchema.safeParse(data.data);

  if (!request.success) {
    return Result.err(new Error("Response is of unexpected structure!"));
  }

  return Result.ok(request.data.users);
};

export const fetchStudents = async (): Promise<Result<User[]>> => {
  const data = await baseApi.get("/users/students");
  const request = UserFetchSchema.safeParse(data.data);

  if (!request.success) {
    return Result.err(new Error("Response is of unexpected structure!"));
  }

  return Result.ok(request.data.users);
};

export const fetchTeachers = async (): Promise<Result<User[]>> => {
  const data = await baseApi.get("/users/teachers");
  const request = UserFetchSchema.safeParse(data.data);

  if (!request.success) {
    return Result.err(new Error("Response is of unexpected structure!"));
  }

  return Result.ok(request.data.users);
};
