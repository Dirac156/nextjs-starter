"use client";

import Spinner from "@/components/spinner/spinner";
import { useToast } from "@/components/ui/use-toast";
import { useSignIn } from "@/hooks";
import { useUserContext } from "@/providers";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInCallbackComplete() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const {
    data: signInUser,
    mutate: signIn,
    isSuccess: isSignIn,
    isError: isSignInError,
  } = useSignIn();
  const { signIn: signUser } = useUserContext();

  useEffect(() => {
    if (isSignInError) {
      toast({
        variant: "destructive",
        description: "Authentication Failed!",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignInError]);

  useEffect(() => {
    router.prefetch("/store");
    router.prefetch("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSignIn) {
      signUser(signInUser);
      router.push("/store");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignIn]);

  useEffect(() => {
    if (user) {
      signIn({
        email: user.emailAddresses[0].emailAddress as string,
        id: user.id,
        firstName: user.firstName as string,
        lastName: user.lastName as string,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div>
      <Spinner />
    </div>
  );
}
