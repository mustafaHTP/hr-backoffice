import { User } from "@/generated/prisma/client";
import { DalResponse } from "@/types/dal-response";
import { prisma } from "../prisma";

export async function getUser(userId: number): Promise<DalResponse<User>> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return DalResponse.Success(user);
  } catch (error) {
    console.log("Error getting user by Id: ", error);

    return DalResponse.Failure();
  }
}

export async function getUserByEmail(
  email: string,
): Promise<DalResponse<User>> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return DalResponse.Success(user);
  } catch (error) {
    console.error("Error getting user by email: ", error);

    return DalResponse.Failure();
  }
}
