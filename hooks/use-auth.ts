import userApi from "@/api/userApi";
import { User } from "@/global";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = () => {
  return useMutation<User, Error, User>({
    mutationKey: ["sign-in"],
    mutationFn: async (user: User) => await userApi.signInUser(user),
  });
};
