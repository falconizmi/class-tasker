import { z } from "zod";
import baseApi from "./index";
import {
  Class_,
  ClassWithoutId,
  ClassFetchSchema,
} from "../models/class";
import { Result } from "@badrap/result";
import { User } from "@/models/user";

export const fetchClasses = async (): Promise<Result<Class_[]>> => {
  const data = await baseApi.get("/classes");
  const request = ClassFetchSchema.safeParse(data.data);

  if (!request.success) {
    return Result.err(new Error("Response is of unexpected structure!"));
  }

  return Result.ok(request.data.classes);
};

export const fetchUserClasses = async (user: User): Promise<Result<Class_[]>> => {
  const data = await baseApi.get(`/classes/user/${user.id}`);
  const request = ClassFetchSchema.safeParse(data.data);

  if (!request.success) {
    return Result.err(new Error("Response is of unexpected structure!"));
  }

  return Result.ok(request.data.classes);
};

export const postClasses = async (class_: ClassWithoutId): Promise<void> => {
  const data = await baseApi.post("/classes", class_, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(data);
};

export const joinClass = async (userId: string, code: string): Promise<void> => {
  const data = await baseApi.post("/classes/join", { user_id: userId, code: code }, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(data);
  console.log("joinclass api")
};

export const leaveClass = async (userId: string, classId: string): Promise<void> => {
  const data = await baseApi.post("/classes/leave", { user_id: userId, class_id: classId }, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(data);
};


export const updateClass = async (class_: Class_): Promise<void> => {
  const data = await baseApi.patch(`/classes/${class_.id}`, class_, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(data);
};

export const deleteClass = async (classId: string): Promise<void> => {
  const data = await baseApi.delete(`/classes/${classId}`);
  console.log(data);
};