"use client";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User } from "@/global";
import Spinner from "@/components/spinner/spinner";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { OAuthStrategy } from "@clerk/types";
import { useUserContext } from "@/providers";
import {
  useAuth,
  useSignIn as useSignInWithClerk,
  useSignUp as useSignUpwithClerk,
} from "@clerk/nextjs";
import { useSignIn } from "@/hooks";

export default function SignIn() {
  const router = useRouter();
  const { signOut: signOutWithClerk } = useAuth();
  const { signIn: signInWithclerk } = useSignInWithClerk();
  const { toast } = useToast();
  const { signIn } = useUserContext();
  // TODO: @Dirac: useSignUp
  const {
    mutate: startSignIn,
    data: signInUser,
    error: signInError,
    isSuccess: isSignIn,
    isError: isSignInError,
    isPending: isSigningIn,
  } = useSignIn();

  // Define the schema using Zod
  const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  type SignInFormValues = z.infer<typeof signInSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormValues) => {
    startSignIn(data as User);
  };

  useEffect(() => {
    router.prefetch("/store");
    router.prefetch("/");
  }, [router]);

  useEffect(() => {
    if (isSignInError) {
      toast({
        variant: "destructive",
        description: `Sign In Failed! ${signInError?.message}`,
      });
    }
  }, [isSignInError, signInError, toast]);

  useEffect(() => {
    if (isSignIn) {
      signIn(signInUser);
      router.push("/store");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignIn]);

  if (!signInWithclerk || !signOutWithClerk) return null;

  const signInWith = async (strategy: OAuthStrategy) => {
    await signOutWithClerk();
    return signInWithclerk?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-fallback",
      redirectUrlComplete: "/sso-fallback-signin",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-lg flex flex-col gap-10">
        <div className="flex flex-items justify-center gap-5">
          <Button
            type="button"
            onClick={() => signInWith("oauth_google")}
            variant={"outline"}
          >
            Sign in with Google
          </Button>
          <Button
            type="button"
            onClick={() => signInWith("oauth_tiktok")}
            variant={"outline"}
          >
            Sign in with Tiktok
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-center dark:text-gray-500">
            Sign In
          </h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={cn(
                "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm",
                { "border-red-500": errors.email }
              )}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={cn(
                "mt-1 block w-full px-3 py-2 border rounded-md shadow-sm",
                { "border-red-500": errors.password }
              )}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center">
            <Button
              className="flex items-center justify-center gap-2"
              disabled={isSigningIn}
            >
              {isSigningIn && <Spinner />}
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
