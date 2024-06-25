"use client";
import Spinner from "@/components/spinner/spinner";
import { useUserContext } from "@/providers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOut() {
  const router = useRouter();
  const { signOut } = useUserContext();
  useEffect(() => {
    router.prefetch("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    signOut();
    router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Spinner /> signing out
    </div>
  );
}
