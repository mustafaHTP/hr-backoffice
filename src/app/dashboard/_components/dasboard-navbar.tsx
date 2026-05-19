import DashboardNavbarUsername from "./dashboard-navbar-username";

export default async function DashboardNavbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="h-18 flex items-center border-b border-white/10 bg-zinc-900/50 backdrop-blur-md px-6">
      <div className="flex items-center justify-between w-full">
        <div className="text-sm text-zinc-300">
          <p className="font-medium">
            <DashboardNavbarUsername />
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">Today is {today}</p>
        </div>
      </div>
    </div>
  );
}
