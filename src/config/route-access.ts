import { Role } from "@/generated/prisma/enums";

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
