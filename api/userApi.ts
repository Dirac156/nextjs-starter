import { AxiosError, User } from "@/global";

class UserAPI {
  async signInUser(user: User): Promise<User> {
    try {
      // TODO: make api call
      return { email: "info@gmail.com", firstName: "", lastName: "" };
    } catch (error: any) {
      throw new Error("error", error?.message);
    }
  }
}

const userApi = new UserAPI();
export default userApi;
