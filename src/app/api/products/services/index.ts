import { IProduct } from "@/types/product";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function addProductToMenu(product: IProduct) {
    try { 
        let menu : any | null  = null ; 
        if(product?.menuId){
             menu = await prisma.menus.findUnique({
                where: { id: product.menuId }
            }) 
        }
        
        console.log(typeof menu)
        let company = await prisma.companies.findUnique({
            where: { id: product.companyId }
        }) 
        if (!company) {
            return null
        }  
        const productAdded = await prisma.products.create({
            data: {
                companyId: product.companyId,
                description: product.description,
                inStock: product.inStock,
                mainImageUrl: product.mainImageUrl,
                name: product.name,
                price: product.price,
                otherImagesUrl: product.otherImagesUrl,
                supplements: []
            }
        })
        if (menu !== null) {
            menu = await prisma.menus.update({
                where: { id: menu.id },
                data: {
                    products: {
                        push: productAdded.id
                    }
                }
            }) 
        }
     

        return productAdded


    } catch (error) {
        console.log(error)
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

export async function updatePorductByIdService(productId: string, productPayload: any) {
    try {
        const product = await prisma.products.findUnique({
            where: { id: productId }
        }) 
        if (!product) {
            return null
        } 
        delete productPayload.id
        const updatedProduct = await prisma.products.update({
            where: { id: productId },
            data: productPayload
        })
        return updatedProduct
    } catch (error) {
        console.log(error)
        throw error
    }

}



export async function deleteProductByIdService(productId: string) {
    try {
        const product = await prisma.products.findUnique({
            where: { id: productId }
        })
        if (!product) {
            return null
        }
        const deletedProduct = await prisma.products.delete({
            where: { id: productId }
        })
        // remove from menus  
        const menus = await prisma.menus.findMany({
            where: {   // Replace `menuId` with the actual menu ID
                products: {
                    has: productId
                }
            }
        })
        
        if(menus.length > 0){
            let updatedMenusPromises : Promise<{
                id: string;
                name: string;
                products: string[];
                companyId: string;
                isActive: boolean;
            }>[] = []
            menus.map((m) => {
                updatedMenusPromises.push(prisma.menus.update({
                    where: { id: m.id },
                    data: {
                        products: {
                            set: m.products.filter((p) => p !== productId)
                        }
                    }
                }))
            })
            await Promise.all(updatedMenusPromises)  
            return deletedProduct
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}
