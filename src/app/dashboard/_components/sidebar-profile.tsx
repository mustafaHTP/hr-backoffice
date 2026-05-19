import { getSessionAsync } from "@/lib/auth";
import SignOutButton from "./signout-button";
import { getUsername as getUsernameAsync } from "@/lib/user";

export default async function SidebarProfile() {
  const session = await getSessionAsync();
  if (!session) {
    throw new Error("Session not found");
  }

  const userName = await getUsernameAsync(session);
  if (!userName) {
    throw new Error("Username not found");
  }

  return (
    <div className="border-t border-white/10 p-4">
      <div className="mb-4">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
          Account
        </p>
        <p className="text-sm font-semibold text-white mt-2 truncate">
          {userName}
        </p>
      </div>
      <SignOutButton />
    </div>
  );
}
