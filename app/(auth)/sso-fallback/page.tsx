"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SignInFallback() {
  return (
    <AuthenticateWithRedirectCallback
      signInForceRedirectUrl={"/sso-fallback-signin"}
      signUpForceRedirectUrl={"/sso-fallback-signup"}
      signInFallbackRedirectUrl={"/sso-fallback-signin"}
      signUpFallbackRedirectUrl={"/sso-fallback-signup"}
    />
  );
}
