import { getSession } from "@/lib/auth";
import SignOutButton from "./SignOutButton";
import { getUser } from "@/lib/dal/user";

export default async function SidebarProfile() {
  const session = await getSession();

  if (!session?.userId) {
    return null;
  }

  const user = await getUser(session.userId);
  if (!user) {
    return null;
  }

  return (
    <div className="border-t border-zinc-200 dark:border-zinc-800 p-4">
      <div className="mb-4">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
          Account
        </p>
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mt-1 truncate">
          {user.email}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 capitalize">
          {user.role.toLowerCase()}
        </p>
      </div>
      <SignOutButton />
    </div>
  );
}
