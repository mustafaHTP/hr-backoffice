import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionAsync } from "./lib/auth";
import { Role } from "./generated/prisma/enums";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await getSessionAsync();
  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // ? local lower case
  // 1. check request path is protected
  const requestedPath = request.nextUrl.pathname.toLowerCase();
  const matchingPath = navItems.find((ni) => {
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

type NavItem = {
  path: string;
  allowedRoles: Role[];
};

// TODO: Every path must be unique
const navItems: NavItem[] = [
  {
    path: "/dashboard/employees",
    allowedRoles: [Role.ADMIN, Role.MANAGER],
  },
  {
    path: "/dashboard/departments",
    allowedRoles: [Role.ADMIN, Role.MANAGER],
  },
  {
    path: "/dashboard/employee-list",
    allowedRoles: [Role.EMPLOYEE],
  },
  {
    path: "/dashboard/leave-requests",
    allowedRoles: [Role.ADMIN, Role.MANAGER],
  },
  {
    path: "/dashboard/leave-request-list",
    allowedRoles: [Role.EMPLOYEE],
  },
];

/**
 * 
   const navItems: NavItemElement[] = [
     {
       href: "/dashboard/employees",
       label: "Employees",
       canShow: session.role === Role.MANAGER || session.role === Role.ADMIN,
     },
     {
       href: "/dashboard/departments",
       label: "Departments",
       canShow: session.role === Role.MANAGER || session.role === Role.ADMIN,
     },
     {
       href: "/dashboard/employee-list",
       label: "Employees",
       canShow: session.role === Role.EMPLOYEE,
     },
     {
       href: "/dashboard/leave-requests",
       label: "Leave Requests",
       canShow: session.role === Role.MANAGER || session.role === Role.ADMIN,
     },
     {
       href: "/dashboard/leave-request-list",
       label: "My Leave Requests",
       canShow: session.role === Role.EMPLOYEE || session.role === Role.MANAGER,
     },
   ];
 */
