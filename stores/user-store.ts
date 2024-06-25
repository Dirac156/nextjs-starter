import { create } from "zustand";
import { User } from "@/global";

export interface UserState {
  user: User | null;
  role: string | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setRole: (role: string | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set(() => ({ user })),
  role: null,
  setRole: (role: string | null) => {
    set(() => ({ role }));
  },
  clearUser: () => {
    set(() => ({ user: null }));
  },
}));
