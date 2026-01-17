// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  // Don’t enforce auth on these destinations to avoid loops
  const bypass = ["/login", "/not-authorized", "/error"];
  const { pathname } = request.nextUrl;
  if (bypass.includes(pathname)) return NextResponse.next();

  // Example: read token/role from cookies (or a header)
  const accessToken = "SAKDFNSKDERER9438R5H943F089347HBFGN9374RT24O";
  const userRole = "admin"; // "admin" | "user" | ""

  // Gate 1: must be authenticated for matched routes
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based routing
  const isAdminPath = pathname.startsWith("/admin");
  const isUserPath =
    pathname.startsWith("/profile") || pathname.startsWith("/dashboard");

  if (isAdminPath && userRole !== "admin") {
    return NextResponse.redirect(new URL("/not-authorized", request.url));
  }

  if (isUserPath && userRole !== "user" && userRole !== "admin") {
    // Let admins access user pages if you want; adjust logic as needed
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
