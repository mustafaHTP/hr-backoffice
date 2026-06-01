"use server";

import { getSessionAsync } from "@/lib/auth";
import { getUserAsync } from "@/lib/dal/user";

export async function getCurrentUserActionAsync() {
  const session = await getSessionAsync();
  if (!session) {
    return null;
  }

  try {
    return await getUserAsync(session.userId);
  } catch {
    return null;
  }
}
