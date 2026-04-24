import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { nextUrl, nextauth } = req;
    const { token } = nextauth;
    const path = nextUrl.pathname;

    // 1. Restriction: Only admins can access /admin routes
    if (path.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/overview", req.url));
    }

    // 2. Redirection: If logged in and visiting /, go to their specific dashboard
    if (path === "/" && token) {
      const destination = token?.role === "admin" ? "/admin" : "/dashboard/overview";
      return NextResponse.redirect(new URL(destination, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        // Allow public access to the Landing Page (/)
        if (pathname === "/") return true;
        // All other matched paths require a token
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
