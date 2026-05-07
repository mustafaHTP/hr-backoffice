import { Role } from "@/generated/prisma/enums";
import { getSession } from "@/lib/auth";
import { NavItem } from "./dashboard-navlink";

type NavItemElement = {
  href: string;
  canShow: boolean;
  label: string;
};

export default async function DashboardSidebarNav() {
  const session = await getSession();
  if (!session) return null;

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
  ];

  return (
    <nav className="flex flex-col gap-2 p-4">
      <NavItem href="/dashboard" label="Home" />
      {navItems
        .filter((ni) => ni.canShow)
        .map((ni, index) => (
          <NavItem key={index} href={ni.href} label={ni.label} />
        ))}
    </nav>
  );
}
