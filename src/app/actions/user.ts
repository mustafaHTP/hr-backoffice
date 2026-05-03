"use server";

import { getSession } from "@/lib/auth";
import { getUser } from "@/lib/dal/user";

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const user = await getUser(session.userId);
  if (!user) {
    return null;
  }

  return user;
}
