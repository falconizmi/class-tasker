import { fetchUsers } from "@/api/userApi";
import { Email, User } from "@/models/user";
import { Result } from "@badrap/result";
import { useQuery } from "@tanstack/react-query";

export function useUserByEmail(email: Email | undefined) {
    const { data, isLoading, isError } = useQuery<Result<User[]>>({
      queryKey: ["users", email],
      queryFn: fetchUsers,
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
  
    if (!email) {
      console.log("No email found");
      return { class_: null, isLoading, isError };
    } 
  
    const user = data.value.find((user) => user.email === email.email);
    return { user, isLoading, isError };
}