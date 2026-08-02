import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Protects app areas and enforces role separation:
 *  - /dashboard   → any authenticated user (clients)
 *  - /consultant  → CONSULTANT or ADMIN
 *  - /admin       → ADMIN only
 * Unauthenticated users are redirected to /login (handled by withAuth).
 */
export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const role = req.nextauth.token?.role;

    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (pathname.startsWith("/consultant") && role !== "CONSULTANT" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      // Only run the middleware body when a token exists; otherwise redirect to signIn.
      authorized: ({ token }) => !!token,
    },
    pages: { signIn: "/login" },
  },
);

export const config = {
  matcher: ["/dashboard/:path*", "/consultant/:path*", "/admin/:path*"],
};
