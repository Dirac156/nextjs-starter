import { AxiosError, User } from "@/global";
import { v4 } from "uuid";

class UserAPI {
  async signInUser(user: User): Promise<User> {
    try {
      // TODO: make api call
      return { email: "info@gmail.com", firstName: "", lastName: "", id: v4() };
    } catch (error: any) {
      throw new Error("error", error?.message);
    }
  }

  async signUpUser(user: User): Promise<User> {
    try {
      // TODO: make api call
      return { email: "info@gmail.com", firstName: "", lastName: "", id: v4() };
    } catch (error: any) {
      throw new Error("error", error?.message);
    }
  }
}

const userApi = new UserAPI();
export default userApi;
