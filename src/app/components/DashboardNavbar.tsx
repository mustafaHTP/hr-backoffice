import { getSession } from "@/lib/auth";
import { getUser } from "@/lib/dal/user";

export default async function DashboardNavbar() {
  const session = await getSession();
  let userName = "Guest";

  if (session?.userId) {
    const user = await getUser(session.userId);
    userName = user?.email || "User";
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          <p className="font-medium">
            Hello{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">
              {userName}
            </span>
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
            Today is {today}
          </p>
        </div>
      </div>
    </div>
  );
}
