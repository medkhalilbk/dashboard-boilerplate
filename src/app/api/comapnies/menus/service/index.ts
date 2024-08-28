import { IMenu, IUpdatedMenu } from "@/types/menu";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function getAllMenusOfCompanyService(companyId: string, page: number, limit: number) {
    try {
        const offset = (page - 1) * limit;
        const totalItems = await prisma.menus.count({
            where: {
                companyId: companyId,
                 
            }
        });
        if (totalItems == 0) {
            return null
        }
        const menus = await prisma.menus.findMany({
            where: {
                companyId: companyId,
                
            },

            skip: offset,
            take: limit,
        });
        const imenus: any[] = []
        for (let menu of menus) {
            const products = await prisma.products.findMany({
                where: {
                    id: { in: menu.products },
                    inStock: true
                },
            });
            const menuObject: any = {
                companyId: menu.companyId,
                id: menu.id,
                name: menu.name,
                isActive: menu.isActive,
                products: products
            }
            imenus.push(menuObject)
        }

        const totalPages = Math.ceil(totalItems / limit);
        return {
            menus: imenus,
            pagination: {
                page,
                limit,
                totalPages,
                totalItems,
            },
        };
    } catch (error) {
        console.error("Error fetching menus:", error);
        throw error;
    }
}


export async function addMenuToCompanyService(menu: any) {
    try {
        const result = await prisma.menus.create({
            data: {
                companyId: menu.companyId,
                name: menu.name,
                isActive: menu.isActive,
                products: menu.products || []
            }
        })
        return result;
    } catch (error: any) {
        console.error("Error creat menus:", error);
        throw error;
    }
}

export async function getMenuByIdService(id: string) {
    try {
        const result = await prisma.menus.findUnique({
            where: { id: id }
        }) as any
        if (!result) {
            return null
        }
        let productsObjects = await prisma.products.findMany({
            where: {
                id: { in: result.products },
                inStock: true
            }
        }) 
        result.products = productsObjects 
        return result;
    } catch (error) {
        console.error("Error fetching menus:", error);
        throw error;
    }
}


export async function updateMenuService(id: string, menu: Partial<IUpdatedMenu>) {
    try {
        const exist = await prisma.menus.findUnique({
            where: { id: id }
        })
        if (!exist) {
            return null
        }
        const result = await prisma.menus.update({
            where: { id: id },
            data: menu
        })
        if (!result) {
            return null
        }
        return result
    } catch (error) {
        console.error("Error updating menus:", error);
        throw error;
    }
}
export async function deleteMenuByIdService(id: string) {
    try {
        const exist = await prisma.menus.findUnique({
            where: { id: id }
        })
        if (!exist) {
            return null
        }
        const result = await prisma.menus.delete({
            where: { id: id }
        })
        return result

    } catch (error) {
        console.error("Error updating menus:", error);
        throw error;
    }
}