import { getSessionAsync } from "@/lib/auth";
import { getUsername } from "@/lib/user";

export default async function DashboardNavbarUsername() {
  const session = await getSessionAsync();
  const userName = getUsername(session);
  if (!userName) {
    throw new Error("Not found user name");
  }

  return (
    <>
      Hello <span className="font-semibold text-white"> {userName}</span>
    </>
  );
}
