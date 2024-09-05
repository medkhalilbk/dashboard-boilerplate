import { ICartPopulated } from '@/types/cartsPopulated';
import { IDeliveryMan } from './../../../../types/DeliveryMan';
import { CartStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function createDeliveryManService(data: IDeliveryMan, userId: string) {
  try {
    const deliveryMan = await prisma.deliveryMans.create({ data: data })
    const user = await prisma.users.update({
      where: { id: userId, isDeleted: false },
      data: {
        deliveryManId: deliveryMan.id,
        updatedAt: new Date()
      },
    });
    return { user, deliveryMan };
  } catch (error: any) {
    throw error
  }

}
export async function getAllDeliveryMenService(page: number, limit: number) {
  const skip = (page - 1) * limit;
  const take = limit;

  try {
    const deliveryMen = await prisma.deliveryMans.findMany({
      skip,
      take,
      where: {
        isDeleted: false
      }
    });

    const users = await prisma.users.findMany({
      where: {
        deliveryManId: {
          not: null,
        },
        isDeleted: false,
      },
    });
    console.log(users)
    console.log("object")
    console.log(deliveryMen)
    return {
      deliveryMen: deliveryMen.map((dm: any) => ({
        ...dm,
        userInfo: users.find((user: any) => user.deliveryManId === dm.id),
      })),
      totalItems: await prisma.deliveryMans.count()
    };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
export async function getDeliveryManByUserIdService(userId: string) {
  try {
    const user = await prisma.users.findUnique({
      where: { id: userId, isDeleted: false },
    });

    if (!user || !user.deliveryManId) {
      return null;
    }

    const deliveryMan = await prisma.deliveryMans.findUnique({
      where: { id: user.deliveryManId },
    });
    return { deliveryManData: deliveryMan, userData: user }
    // return {...deliveryMan,...user};
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
export async function updateDeliveryManService(deliveryManId: string, data: Partial<IDeliveryMan>) {
  try {
    const updatedDeliveryMan = await prisma.deliveryMans.update({
      where: { id: deliveryManId },
      data: data,
    });
    return updatedDeliveryMan;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
export async function deleteDeliveryManService(deliveryManId: string) {
  try {
    const user = await prisma.users.findFirst({
      where: { deliveryManId: deliveryManId },
    });
    if (!user) { return null }

    await prisma.users.update({
      where: { id: user!.id },
      data: {
        deliveryManId: null,
        isDeleted: true
      },
    });


    const deletedDeliveryMan = await prisma.deliveryMans.update({
      where: { id: deliveryManId },
      data: {
        isActive: false,
        isDeleted: true,
      }
    });

    return deletedDeliveryMan;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}


export async function getCartsByDeliveryMan(id: string) {
  try {
    const deliveryManExists = await prisma.deliveryMans.findUnique({
      where: { id: id },
    });
    console.log("Delivery Man Exists:", deliveryManExists);
    
    if (!deliveryManExists) {
      return null;
    }

    const carts = await prisma.carts.findMany({
      where: { deliveryManAccountId: id },
    });
    console.log("Carts:", carts);

    if (carts.length === 0) {
      throw new Error("There is no delivered product for this delivery man");
    }

    const result = await Promise.all(
      carts.map(async (cart: any) => {
        const fullOrders = await prisma.orders.findMany({
          where: { id: { in: cart.orders as string[] } },
        });
        fullOrders.map(async(order:any) => {
          order.product = await prisma.products.findFirst({
            where:{
              id:order.productId
            }
          })
          order.restaurant = await prisma.companies.findFirst({
            where:{
              id:order.restaurantId
            }
          })
        })
        let client = await prisma.users.findFirst({
          where:{
            id:cart.clientId
          }
        })
       
        return { ...cart, orders: fullOrders,client:client }; // Returning the populated cart
      })
    );

    return result;
  } catch (error) {
    console.error("Error in getCartsByDeliveryMan:", error);
    throw error;
  }
}


export async function getCartsHistoryByDeliveryMan(id: string) {
  const deliveryManExists = await prisma.deliveryMans.findUnique({
    where: { id: id }
  })
  console.log(deliveryManExists)
  if (!deliveryManExists) {

    return null
  }
  const carts: any = await prisma.carts.findMany({ where: { deliveryManAccountId: id, status: "step5" } })
  const result: any = []
  // console.log(carts)
  if (carts.length == 0) {
    throw new Error("there is no delivered product for this delivery man ")
  }

  for (const cart of carts) {
    const fullOrders: any = await prisma.orders.findMany({
      where: { id: { in: cart.orders as string[] } } // Fetch full order details by IDs
    });
    for (const order of fullOrders) {
      order.restaurant = await prisma.companies.findUnique({
        where: { id: order.restaurantId }
      });
    }
    cart.clientId = await prisma.users.findUnique({
      where: { id: cart.clientId }
    })
    cart.orders = [...fullOrders];
  }

  return carts

}