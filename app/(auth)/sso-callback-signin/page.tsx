"use client";

import ConsoleLog from "@/utils/console-log";
import { useUser } from "@clerk/nextjs";

export default function SignInCallback() {
  const { user } = useUser();
  ConsoleLog(user);
  ConsoleLog("signing in");
  return <div></div>;
}
