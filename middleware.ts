// pages/_middleware.ts
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
// Define your public and private routes
const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/sign-out",
  "/sign-in-redirect",
  "/sso-fallback",
  "/sso-fallback-signin",
  "/sso-fallback-signup",
];

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  // Allow static files to be served
  if (pathname.startsWith("/static") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Check if the current route is a public route
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  // Check for the auth token in cookies
  const token = req.cookies.get("auth_token");

  if (!token) {
    // Redirect to login page if not authenticated
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  // If authenticated, allow the request to proceed
  return NextResponse.next();
}
