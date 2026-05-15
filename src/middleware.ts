import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionAsync } from "./lib/auth";
import { routeAccessRules } from "./config/route-access";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await getSessionAsync();
  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // ? local lower case
  // 1. check request path is protected
  const requestedPath = request.nextUrl.pathname.toLowerCase();
  const matchingPath = routeAccessRules.find((ni) => {
    return ni.path.toLowerCase() === requestedPath;
  });

  if (!matchingPath) {
    return NextResponse.next();
  }

  // 2. check current user role enough to visit request path
  const role = session.role;
  const matchingRole = matchingPath.allowedRoles.find((ar) => {
    return ar === role;
  });

  // TODO: navigate not found page
  // research is it correct or not
  if (!matchingRole) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
