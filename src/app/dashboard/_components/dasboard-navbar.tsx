import { getSessionAsync } from "@/lib/auth";
import { getUserAsync } from "@/lib/dal/user";

export default async function DashboardNavbar() {
  const session = await getSessionAsync();
  let userName = "Guest";

  if (session?.userId) {
    try {
      const user = await getUserAsync(session.userId);
      if (user) {
        userName = user.email || "User";
      }
    } catch {
      // keep Guest
    }
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="h-[72px] flex items-center border-b border-white/10 bg-zinc-900/50 backdrop-blur-md px-6">
      <div className="flex items-center justify-between w-full">
        <div className="text-sm text-zinc-300">
          <p className="font-medium">
            Hello <span className="font-semibold text-white">{userName}</span>
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">Today is {today}</p>
        </div>
      </div>
    </div>
  );
}
