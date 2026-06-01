import { getSessionAsync } from "@/lib/auth";
import { NavItem } from "./dashboard-navlink";
import { getAvailableRoutes } from "@/config/route-access";

export default async function DashboardSidebarNav() {
  const session = await getSessionAsync();
  if (!session) return null;
  const role = session.role;
  const availableRoutesForRole = getAvailableRoutes(role);
  return (
    <nav className="flex flex-col gap-2 p-4">
      <NavItem href="/dashboard" label="Home" icon="house" />
      {availableRoutesForRole.map((route, index) => (
        <NavItem
          key={index}
          href={route.path}
          label={route.label}
          icon={route.icon}
        />
      ))}
    </nav>
  );
}
