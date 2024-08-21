import { ICart } from "@/types/cart";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function addCartService(cart: ICart) {
    try {
        const client = await prisma.users.findUnique({
            where: { id: cart.clientId }
        });
        if (!client) {
            throw new Error("the client id is wrong")
        }
        if(!cart.companiesIds || (cart.companiesIds.length == 0)){
            throw new Error("the companiesIds is empty")
        }
        const deliveryManAccount = await prisma.deliveryMans.findUnique({
            where: { id: cart.deliveryManAccountId }
        }); 
        if (!deliveryManAccount) {
            throw new Error("the delivery man id is wrong")
        }
        const searchCompanies = await prisma.companies.findMany({
            where:{
                id : {
                    in:cart.companiesIds
                }
            }
        })
        console.log(searchCompanies)
        if(searchCompanies.length == 0){
            throw new Error("company/companies does not exist")
        }
        const cartAdded = await prisma.carts.create({
            data: {
                orders: cart.orders,
                location: cart.location,
                totalPrice: cart.totalPrice,
                clientId: cart.clientId,
                deliveryManAccountId: cart.deliveryManAccountId,
                status: cart.status,
                companiesIds: cart.companiesIds
            }
        });

        return cartAdded;
    } catch (error) {
        console.error("Error creating cart:", error);
        throw error;
    }
}

export async function getAllCartsService(limit: number, page: number) {
    try {
        const offset = (page - 1) * limit;
        const totalItems = await prisma.carts.count();

        if (totalItems === 0) {
            return null;
        }

        const carts = await prisma.carts.findMany({
            skip: offset,
            take: limit,
        });

        const totalPages = Math.ceil(totalItems / limit);

        return {
            carts,
            pagination: {
                page,
                limit,
                totalPages,
                totalItems,
            },
        };
    } catch (error) {
        console.error("Error fetching carts:", error);
        throw error;
    }
}
export async function getCartByIdService(id: string) {
    try {
        const cart = await prisma.carts.findUnique({
            where: { id }
        });
        if (!cart) {
            return null;
        }
        return cart;
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw error;
    }
}

export async function updateCartByIdService(cartId: string, cart: Partial<ICart>) {
    try {
        const existingCart = await prisma.carts.findUnique({
            where: { id: cartId }
        });
        if (!existingCart) {
            return null;
        }
        const updatedCart = await prisma.carts.update({
            where: { id: cartId },
            data: cart
        });
        return updatedCart;
    } catch (error) {
        console.error("Error updating cart:", error);
        throw error;
    }
}

export async function deleteCartByIdService(cartId: string) {
    try {
        const cart = await prisma.carts.findUnique({
            where: { id: cartId }
        });
        if (!cart) {
            return null;
        }
        await prisma.carts.delete({
            where: { id: cartId }
        });
        return cart;
    } catch (error) {
        console.error("Error deleting cart:", error);
        throw error;
    }
}