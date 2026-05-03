import { prisma } from "../prisma";

export async function getUser(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
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
