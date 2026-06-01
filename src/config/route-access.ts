import { Role } from "@/generated/prisma/enums";
import {
  AlarmClockOff,
  Boxes,
  GitFork,
  House,
  type LucideIcon,
  UserMinus,
  Users,
} from "lucide-react";

export function hasAccess(role: Role, requestedPath: string) {
  const rule = getRouteAccessRule(requestedPath);

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

export function getAvailableRoutes(role: Role) {
  return routeAccessRules.filter((ral) => {
    return hasAccessToRoute(role, ral);
  });
}

export type IconKey =
  | "house"
  | "fork"
  | "users"
  | "userMinus"
  | "alarm"
  | "boxes";

export const iconMap: Record<IconKey, LucideIcon> = {
  house: House,
  fork: GitFork,
  users: Users,
  userMinus: UserMinus,
  alarm: AlarmClockOff,
  boxes: Boxes,
};

export type RouteAccessRule = {
  path: string;
  allowedRoles: Role[];
  label: string;
  icon?: IconKey;
};

// TODO: Every path must be unique
export const routeAccessRules: RouteAccessRule[] = [
  {
    path: "/dashboard/employees",
    allowedRoles: [Role.ADMIN, Role.MANAGER],
    label: "Employees",
    icon: "users",
  },
  {
    path: "/dashboard/departments",
    allowedRoles: [Role.ADMIN, Role.MANAGER],
    label: "Departments",
    icon: "fork",
  },
  {
    path: "/dashboard/employee-list",
    allowedRoles: [Role.EMPLOYEE],
    label: "Employees",
    icon: "users",
  },
  {
    path: "/dashboard/leave-requests",
    allowedRoles: [Role.ADMIN, Role.MANAGER],
    label: "Leave Requests",
    icon: "userMinus",
  },
  {
    path: "/dashboard/leave-request-list",
    allowedRoles: [Role.EMPLOYEE],
    label: "My Leave Requests",
    icon: "alarm",
  },
  {
    path: "/dashboard/organization-schema",
    allowedRoles: [Role.MANAGER, Role.ADMIN],
    label: "Organization Schema",
    icon: "boxes",
  },
];
