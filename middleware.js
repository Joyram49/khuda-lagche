import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

import {
  ADMIN_PROFILE,
  BUSINESS_PROFILE,
  DASHBOARD,
  GENERAL_PROFILE,
  LOGIN,
  PUBLIC_ROUTES,
  ROOT,
} from "@/lib/routes";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isPublicRoute =
    PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;

  const allRoutes = [
    ...PUBLIC_ROUTES,
    ADMIN_PROFILE,
    BUSINESS_PROFILE,
    GENERAL_PROFILE,
    DASHBOARD,
    "/checkout",
    "/access-denied",
    "/order-complete",
    "/api/users",
    "/api/auth/imgKitAuth",
  ];

  const isKnownRoute = allRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // If route is unknown, return a 404 response without redirecting
  if (!isKnownRoute && nextUrl.pathname !== ROOT) {
    return NextResponse.rewrite(new URL("/404", req.url), { status: 404 });
  }

  // If not authenticated and not on a public route, redirect to login
  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL(LOGIN, nextUrl));

  let userRole;
  if (isAuthenticated) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    userRole = token?.user ? token?.user?.role : "customer";
  }

  const roleRestrictions = {
    customer: [BUSINESS_PROFILE, ADMIN_PROFILE, DASHBOARD],
    vendor: [GENERAL_PROFILE, ADMIN_PROFILE, DASHBOARD],
    admin: [BUSINESS_PROFILE, GENERAL_PROFILE],
  };

  const restrictedRoutes = roleRestrictions[userRole] || [];

  const isRestricted = restrictedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (isRestricted) {
    const redirectUrl = new URL("/access-denied", nextUrl);
    redirectUrl.searchParams.append("role", userRole);
    return Response.redirect(redirectUrl);
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
