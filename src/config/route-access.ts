import { Role } from "@/generated/prisma/enums";

export function hasAccess(role: Role, requestedPath: string) {
  const rule = getRouteAccessRule(requestedPath);

  // If route is not protected → allow
  if (!rule) return true;

  return hasAccessToRoute(role, rule);
}

export function getRouteAccessRule(requestedPath: string) {
  return routeAccessRules.find(
    (r) => r.path.toLowerCase() === requestedPath.toLowerCase(),
  );
}

export function hasAccessToRoute(role: Role, rule: RouteAccessRule) {
  return rule.allowedRoles.includes(role);
}

export type RouteAccessRule = {
  path: string;
  allowedRoles: Role[];
};

// TODO: Every path must be unique
export const routeAccessRules: RouteAccessRule[] = [
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
