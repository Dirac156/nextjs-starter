"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SignInFallback() {
  return (
    <AuthenticateWithRedirectCallback
      signInFallbackRedirectUrl={"/sso-fallback-signin"}
      signUpFallbackRedirectUrl={"/sso-fallback-signup"}
    />
  );
}
