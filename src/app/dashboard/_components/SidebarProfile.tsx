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
    <div className="border-t border-white/10 p-4">
      <div className="mb-4">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
          Account
        </p>
        <p className="text-sm font-semibold text-white mt-2 truncate">
          {user.email}
        </p>
        <p className="text-xs text-zinc-400 mt-1 capitalize">
          {user.role.toLowerCase()}
        </p>
      </div>
      <SignOutButton />
    </div>
  );
}
