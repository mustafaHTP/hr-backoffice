import { getSession } from "../auth";
import { prisma } from "../prisma";

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
    });
    return currentUser;
  } catch (error) {
    console.log("Error getting user by Id: ", error);
    return null;
  }
}
