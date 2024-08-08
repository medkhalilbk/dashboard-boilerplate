import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addOrderService(order: IOrder) {
    try {
        const product = await prisma.products.findUnique({
            where: { id: order.productId }
        });
        const restaurant = await prisma.companies.findUnique({
            where: { id: order.restaurant }
        });

        if (!product || !restaurant) {
            return null;
        }

        const orderAdded = await prisma.orders.create({
            data: {
                productId: order.productId,
                quantity: order.quantity,
                Restaurant: order.restaurant,
                price: order.price,
                createdAt: new Date()
            }
        });

        return orderAdded;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
}

export async function getAllOrdersService(limit: number, page: number) {
    try {
        const offset = (page - 1) * limit;
        const totalItems = await prisma.orders.count();

        if (totalItems === 0) {
            return null;
        }

        const orders = await prisma.orders.findMany({
            skip: offset,
            take: limit,
        });

        const totalPages = Math.ceil(totalItems / limit);

        return {
            orders,
            pagination: {
                page,
                limit,
                totalPages,
                totalItems,
            },
        };
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

export async function getOrderByIdService(id: string) {
    try {
        const order = await prisma.orders.findUnique({
            where: { id }
        });
        if (!order) {
            return null;
        }
        return order;
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
}

export async function updateOrderByIdService(orderId: string, order: Partial<IOrder>) {
    try {
        const existingOrder = await prisma.orders.findUnique({
            where: { id: orderId }
        });
        if (!existingOrder) {
            return null;
        }
        const updatedOrder = await prisma.orders.update({
            where: { id: orderId },
            data: order
        });
        return updatedOrder;
    } catch (error) {
        console.error("Error updating order:", error);
        throw error;
    }
}

export async function deleteOrderByIdService(orderId: string) {
    try {
        const order = await prisma.orders.findUnique({
            where: { id: orderId }
        });
        if (!order) {
            return null;
        }
        await prisma.orders.delete({
            where: { id: orderId }
        });
        return order;
    } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
    }
}

