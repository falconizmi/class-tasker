import { useQuery } from "@tanstack/react-query";
import { fetchClasses, fetchUserClasses } from "@/api/classApi";
import { Class_ } from "@/models/class";
import { User } from "@/models/user";
import { Result } from "@badrap/result";

export function useClasses() {
    const { data, isLoading, isError } = useQuery<Result<Class_[]>>({
      queryKey: ["classes"],
      queryFn: fetchClasses,
    });
  
    if (isLoading) {
      console.log("Waiting");
      return { class_: null, isLoading, isError };
    }
  
    if (isError || !data) {
      console.log("Error occurred");
      return { class_: null, isLoading, isError };
    }
  
    if (data.isErr) {
      console.log("Error occurred in data");
      console.log(data.error);
      return { class_: null, isLoading, isError };
    }
  
    const classes = data.value;
    return { classes, isLoading, isError };
  }

export function useClassByClassId(classId: string | undefined) {
  const { data, isLoading, isError } = useQuery<Result<Class_[]>>({
    queryKey: ["classes", classId],
    queryFn: fetchClasses,
  });

  if (isLoading) {
    console.log("Waiting");
    return { class_: null, isLoading, isError };
  }

  if (isError || !data) {
    console.log("Error occurred");
    return { class_: null, isLoading, isError };
  }

  if (data.isErr) {
    console.log("Error occurred in data");
    console.log(data.error);
    return { class_: null, isLoading, isError };
  }

  if (!classId) {
    console.log("No class found");
    return { class_: null, isLoading, isError };
  } 

  const class_ = data.value.find((class_) => class_.id === classId);
  return { class_, isLoading, isError };
}

export function useClassByCode(code: string) {
  const { data, isLoading, isError } = useQuery<Result<Class_[]>>({
    queryKey: ["classes", code],
    queryFn: fetchClasses,
  });

  if (isLoading) {
    console.log("Waiting");
    return { class_: null, isLoading, isError };
  }

  if (isError || !data) {
    console.log("Error occurred");
    return { class_: null, isLoading, isError };
  }

  if (data.isErr) {
    console.log("Error occurred in data");
    console.log(data.error);
    return { class_: null, isLoading, isError };
  }

  const class_ = data.value.find((class_) => class_.code === code);
  return { class_, isLoading, isError };
}

export function useClassesByUser(user: User) {
    const { data, isLoading, isError } = useQuery<Result<Class_[]>>({
      queryKey: ["classes", user.id],
      queryFn: () => fetchUserClasses(user),
      enabled: !!user,
    });
  
    if (isLoading) {
      console.log("Waiting");
      return { class_: null, isLoading, isError };
    }
  
    if (isError || !data) {
      console.log("Error occurred");
      return { class_: null, isLoading, isError };
    }
  
    if (data.isErr) {
      console.log("Error occurred in data");
      console.log(data.error);
      return { class_: null, isLoading, isError };
    }
  
    const classes = data.value;
    return { classes, isLoading, isError };
  }