import { IProduct } from "@/types/product";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function addProductToMenu(product: IProduct) {
    try {
        let menu = await prisma.menus.findUnique({
            where: { id: product.menuId }
        })
        if (!menu) {
            return null
        }
        const productAdded = await prisma.products.create({
            data: {
                description: product.description,
                inStock: product.inStock,
                mainImageUrl: product.mainImageUrl,
                name: product.name,
                price: product.price,
                otherImagesUrl: product.otherImagesUrl,
                supplements: []
            }
        })

        menu = await prisma.menus.update({
            where: { id: menu.id },
            data: {
                products: {
                    push: productAdded.id
                }
            }
        })

        return productAdded


    } catch (error) {

    }
}
export async function getAllProductsService(limit: number, page: number) {
    try {
        const offset = (page - 1) * limit;
        const totalItems = await prisma.products.count();

        if (totalItems === 0) {
            return null;
        }

        const products = await prisma.products.findMany({
            where: { inStock: true },
            skip: offset,
            take: limit,
        });

        const totalPages = Math.ceil(totalItems / limit);

        return {
            products,
            pagination: {
                page,
                limit,
                totalPages,
                totalItems,
            },
        };
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export async function getPorductByIdService(id: string) {
    try {
        const product = await prisma.products.findUnique({
            where: { id: id }
        })
        if (!product) {
            return null
        }
        return product
    } catch (error) {
        console.log(error)
        throw error
    }

}

export async function updatePorductByIdService(productId: string, product: Partial<IProduct>) {
    try {
        const product = await prisma.products.findUnique({
            where: { id: productId }
        })
        if (!product) {
            return null
        }
        const updatedProduct = await prisma.products.update({
            where: { id: productId },
            data: product
        })
        return updatedProduct
    } catch (error) {
        console.log(error)
        throw error
    }

}

