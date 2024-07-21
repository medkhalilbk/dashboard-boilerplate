import { PrismaClient ,deliveryMan} from "@prisma/client";

const prisma = new PrismaClient();


export async function createDeliveryManService(data:deliveryMan,userId:string) {
  try {
    const deliveryMan = await prisma.deliveryMan.create({data:data})
    const user = await prisma.user.update({
        where: { id: userId },
        data: {
          deliveryManId: deliveryMan.id,
        },
      });
      return { user, deliveryMan };
  } catch (error:any) {
    throw error
  }
    
}
export async function getAllDeliveryMenService  () {
    try {
        const deliveryMen = await prisma.deliveryMan.findMany();
        const users = await prisma.user.findMany({
          where: {
            deliveryManId: {
              not: null,
            },
          },
          include: {
            deliveryMan: true,
          },
        });
      
        return users.map(user => ({
          ...user,
          deliveryMan: deliveryMen.find(dm => dm.id === user.deliveryManId),
        }));
    } catch (error:any) {
        trhow error
    }
};
export async function getUserWithDeliveryMan  (userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        deliveryMan: true,
      },
    });
    return user;
  };