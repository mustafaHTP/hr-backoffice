"use server";

import { getSession } from "@/lib/auth";
import { getUser } from "@/lib/dal/user";

export async function getCurrentUserActionAsync() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  try {
    return await getUser(session.userId);
  } catch {
    return null;
  }
}
