import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If user is authenticated and trying to access login/register, redirect to discover
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (token && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/discover", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;

        // Public routes — always allow
        const publicPaths = [
          "/",
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/verify-email",
          "/about",
          "/contact",
          "/faq",
          "/elite",
          "/privacy",
          "/terms",
          "/safety",
          "/success-stories",
        ];

        // Allow public paths
        if (publicPaths.some((p) => pathname === p)) {
          return true;
        }

        // Allow API routes and static assets
        if (
          pathname.startsWith("/api/") ||
          pathname.startsWith("/_next/") ||
          pathname.startsWith("/favicon")
        ) {
          return true;
        }

        // Everything else requires auth
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
