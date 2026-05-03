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

export async function getUserByEmail(email: string) {
  try {
    const user = prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error getting user by email: ", error);
    return null;
  }
}
