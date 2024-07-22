import { IUser } from "@/types/User";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function addUserService(user: IUser) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const response = await prisma.users.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        deliveryAddress: user.deliveryAddress,
        imgUrl: user.imgUrl,
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUserService(id: string, data: Partial<IUser>) {
  try {
    const user = await prisma.users.update({
      where: { id, isDeleted: false },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    if (!user) {
      return null
    }
    return user;
  } catch (error) {
    throw error
  }
}

export async function getAllUsersService(page: number, limit: number) {
  try {
    const offset = (page - 1) * limit;

    const users = await prisma.users.findMany({
      skip: offset,
      take: limit,
      where: {
        isDeleted: false
      }
    });
    const totalItems = await prisma.companies.count();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      users,
      pagination: {
        page,
        limit,
        totalPages,
        totalItems,
      },
    };
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserByIdService(id: string) {
  const user = await prisma.users.findUnique({ where: { id, isDeleted: false } });
  if (!user) return null
  return user;
}

export async function deleteUserService(id: string) {
  try {
    const user = await prisma.users.update({
      where: { id },
      data: {
        isDeleted: true,
        updatedAt: new Date(),
      },
    });
    return user;
  } catch (error) {
    throw error
  }
}