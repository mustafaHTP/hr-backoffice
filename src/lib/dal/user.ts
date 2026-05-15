import { User } from "@/generated/prisma/client";
import { prisma } from "../prisma";

export async function getUserAsync(userId: number): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error("Error getting user by id:", error);
    throw error;
  }
}

export async function getUserByEmailAsync(email: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
}
