import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionAsync } from "./lib/auth";
import { getRouteAccessRule, hasAccessToRoute } from "./config/route-access";

export async function middleware(request: NextRequest) {
  const session = await getSessionAsync();

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // check requested path is protected
  const requestedPath = request.nextUrl.pathname;
  const rule = getRouteAccessRule(requestedPath);

  // if it is not protected, go on
  if (!rule) {
    return NextResponse.next();
  }

  // check enough role to visit page
  const allowed = hasAccessToRoute(session.role, rule);

  if (!allowed) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
