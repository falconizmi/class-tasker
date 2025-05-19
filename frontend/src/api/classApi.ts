import baseApi from "./index";
import {
  Class_,
  ClassWithoutId,
  ClassFetchSchema,
} from "../models/classroom";
import { Result } from "@badrap/result";
import { User } from "@/models/user";

export const fetchClasses = async (): Promise<Result<Class_[]>> => {
  const data = await baseApi.get("/classrooms");
  const request = ClassFetchSchema.safeParse(data.data);

  if (!request.success) {
    return Result.err(new Error("Response is of unexpected structure!"));
  }

  return Result.ok(request.data.data);
};

export const fetchUserClasses = async (user: User): Promise<Result<Class_[]>> => {
  const data = await baseApi.get(`/classrooms/user/${user.id}`);
  const request = ClassFetchSchema.safeParse(data.data);

  if (!request.success) {
    return Result.err(new Error("Response is of unexpected structure!"));
  }

  return Result.ok(request.data.data);
};

export const postClasses = async (class_: ClassWithoutId): Promise<void> => {
  const data = await baseApi.post("/classrooms", class_, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(data);
};

export const joinClass = async (userId: string, code: string): Promise<void> => {
  const data = await baseApi.post("/classrooms/join", { user_id: userId, code: code }, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(data);
  console.log("joinclass api")
};

export const leaveClass = async (userId: string, classroom_id: string): Promise<void> => {
  const data = await baseApi.post("/classrooms/leave", { user_id: userId, classroom_id: classroom_id }, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(data);
};


export const updateClass = async (class_: Class_): Promise<void> => {
  const data = await baseApi.patch(`/classrooms/${class_.id}`, class_, {
    headers: { "Content-Type": "application/json" },
  });
  console.log(data);
};

export const deleteClass = async (classroom_id: string): Promise<void> => {
  const data = await baseApi.delete(`/classrooms/${classroom_id}`);
  console.log(data);
};