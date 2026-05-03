import { prisma } from "./prisma";

export async function getUser(id: number) {
  return prisma.user.findUnique({
    where: { id },
  });
}
