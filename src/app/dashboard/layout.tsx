import { NavItem } from "../components/DashboardNavLink";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-sm font-semibold tracking-wide text-zinc-500 dark:text-zinc-400 uppercase">
            HR Dashboard
          </h2>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          <NavItem href="/dashboard" label="Overview" />
          <NavItem href="/dashboard/employees" label="Employees" />
          <NavItem href="/dashboard/departments" label="Departments" />
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
