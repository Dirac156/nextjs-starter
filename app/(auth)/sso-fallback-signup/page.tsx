"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SignUpCallbackComplete() {
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      // TODO: @Dirac save users
    }
  }, [user]);
  return <div></div>;
}
