"use server";

import { getSession } from "@/lib/auth";
import { getUser } from "@/lib/dal/user";

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const userResult = await getUser(session.userId);
  if (!userResult.isSuccess()) {
    return null;
  }

  return userResult.getData() ?? null;
}
