import { getSession } from "@/lib/auth";
import { getUser } from "@/lib/dal/user";

export default async function DashboardNavbar() {
  const session = await getSession();
  let userName = "Guest";

  if (session?.userId) {
    const userResult = await getUser(session.userId);
    if (userResult.isSuccess()) {
      const user = userResult.getData();
      userName = user?.email || "User";
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
