import Link from "next/link";
import DashboardNavbar from "./_components/DashboardNavbar";
import SidebarProfile from "./_components/SidebarProfile";
import DashboardSidebarNav from "./_components/DashboardSidebarNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-64 border-r border-white/10 bg-zinc-900/50 backdrop-blur-md flex flex-col">
        <div className="h-[72px] flex items-center border-b border-white/10 px-6">
          <h2 className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
            <Link
              href="/dashboard"
              className="transition hover:text-violet-300"
            >
              HR Dashboard
            </Link>
          </h2>
        </div>

        <DashboardSidebarNav />

        <div className="flex-1" />

        <SidebarProfile />
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        <DashboardNavbar />
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}
