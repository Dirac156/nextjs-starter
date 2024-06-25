// src/contexts/UserContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  use,
  useEffect,
} from "react";
import { useUserStore } from "@/stores/user-store";
import { User } from "@/global";
import { deleteCookie, setCookie } from "@/utils/cookies";

interface UserContextProps {
  children: ReactNode;
}

// TODO: @Dirac set context return type type
const UserContext = createContext<any>(null);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const userLocalStorageKey = "user";
  const setUser = useUserStore((state) => state.setUser);
  const { user: userData, clearUser } = useUserStore();

  //   TODO: @Dirac load user from localstorage
  // TODO: @Dirac authenticate user
  //   TODO: @Dirac logout user
  const signIn = (user: User) => {
    setUser(user);
    localStorage.setItem(userLocalStorageKey, JSON.stringify(user));
    setCookie("auth_token", user?.id as string, {
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 3600,
    });
  };

  const reAuthenticate = () => {
    const user = localStorage.getItem(userLocalStorageKey);
    if (user) {
      setUser(JSON.parse(user));
      setCookie("auth_token", JSON.parse(user).id, {
        path: "/",
        secure: true,
        sameSite: "strict",
        maxAge: 3600,
      });
    }
  };

  useEffect(() => {
    reAuthenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = () => {
    clearUser();
    localStorage.removeItem(userLocalStorageKey);
    deleteCookie("auth_token", { path: "/" });
  };

  return (
    <UserContext.Provider value={{ user: userData, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
