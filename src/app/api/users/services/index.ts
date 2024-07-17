import { PrismaClient, user } from "@prisma/client";

const prisma = new PrismaClient();

export async function addUserService(user: user) {
  try {
    const response = await prisma.user.create({ data: user });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUserService(id: string, data: Partial<user>) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    return user;
  } catch (error) {}
}

export async function getAllUsersService() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getUserByIdService(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
}
