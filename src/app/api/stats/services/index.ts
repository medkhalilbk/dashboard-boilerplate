import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getDeliveriesPerRestaurantPerMonth() {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  // Find all carts with status "livred" created after the first day of the current month
  const carts = await prisma.cart.findMany({
    where: {
      status: 'step5',
      createdAt: {
        gte: firstDayOfMonth,
      },
    },
    include: {
      orders: true,
    },
  });

  // Flatten orders from carts
  const orders = carts.flatMap(cart => cart.orders);

  // Group orders by restaurant
  const restaurantOrderCount: { [key: string]: number } = {};
  orders.forEach((order: any) => {
    if (order.Restaurant) {
      if (!restaurantOrderCount[order.Restaurant]) {
        restaurantOrderCount[order.Restaurant] = 0;
      }
      restaurantOrderCount[order.Restaurant]++;
    }
  });

  return restaurantOrderCount;
}

export async function getIncomePerRestaurantPerMonth() {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  // Find all carts with status "livred" created after the first day of the current month
  const carts = await prisma.cart.findMany({
    where: {
      status: 'step5',
      createdAt: {
        gte: firstDayOfMonth,
      },
    },
    include: {
      orders: true,
    },
  });

  // Flatten orders from carts
  const orders = carts.flatMap(cart => cart.orders);

  // Group orders by restaurant and calculate income
  const restaurantIncome: { [key: string]: number } = {};
  orders.forEach((order: any) => {
    if (order.Restaurant) {
      if (!restaurantIncome[order.Restaurant]) {
        restaurantIncome[order.Restaurant] = 0;
      }
      restaurantIncome[order.Restaurant] += order.price;
    }
  });

  return restaurantIncome;
}