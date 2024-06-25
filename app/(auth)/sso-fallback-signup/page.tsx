"use client";

import Spinner from "@/components/spinner/spinner";
import { useToast } from "@/components/ui/use-toast";
import { useSignUp } from "@/hooks";
import { useUserContext } from "@/providers";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpCallbackComplete() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const { signIn } = useUserContext();
  const {
    data: signedUpUser,
    mutate: signUp,
    isSuccess: isSignUp,
    isError: isSignUpError,
  } = useSignUp();

  useEffect(() => {
    if (isSignUpError) {
      toast({
        variant: "destructive",
        description: "Authentication Failed!",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignUpError]);

  useEffect(() => {
    router.prefetch("/store");
    router.prefetch("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSignUp) {
      signIn(signedUpUser);
      router.push("/store");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignUp]);

  useEffect(() => {
    if (user) {
      signUp({
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
