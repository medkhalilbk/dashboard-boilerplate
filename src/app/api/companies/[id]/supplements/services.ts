import { getPorductByIdService } from "@/app/api/products/services";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getSupplementsByCompanyIdService(companyId: string) {
    try {
        const supplements = await prisma.supplements.findMany({
        where: { companyId },
        });
        return supplements;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getSupplementByIdService(id: string) {
    try {
        const supplement = await prisma.supplements.findUnique({ where: { id: id } });
        return supplement;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createSupplementService(supplement: any) {
    try {
        const supplementCreated = await prisma.supplements.create({
            data: { ...supplement },
        });
        return supplementCreated;
    } catch (error) {
        throw error;
    }
}

export async function updateSupplementService(id: string, supplement: any) {
    try {
        const supplementUpdated = await prisma.supplements.update({
            where: { id },
            data: { ...supplement },
        });
        return supplementUpdated;
    } catch (error) {
        throw error;
    }
}


export async function getStatsByCompanyIdService(companyId: string) {
    try {
         // top sales for products of the company in this month 

         let companyOrders = await prisma.carts.findMany({
            where: {
                companiesIds :{
                    has: companyId 
                } , 
                createdAt:{
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
                }
            } 
         })
         // remove duplications
            let ordersIds = companyOrders.flatMap((order) => order.orders)
            ordersIds = Array.from(new Set(ordersIds))
            let ordersData = await prisma.orders.findMany({
                where:{
                    id:{
                        in: ordersIds,
                    },
                    restaurantId: companyId
                    
                }
            })
         // get the most product sold 
            let producIdstWithQuantity : {[key:string]:number} = {}
            ordersData.forEach((order) => { 
                if(producIdstWithQuantity[order.productId]){
                    producIdstWithQuantity[order.productId] += order.quantity
                }else{
                    producIdstWithQuantity[order.productId] = order.quantity
                } 
            })
            let chartOfTopSales = Object.keys(producIdstWithQuantity).map((productId) => { 
                return {
                    name: productId,
                    quantity: producIdstWithQuantity[productId]
                }
            })
            console.log(chartOfTopSales)
            let namePromises = chartOfTopSales.map((product) => {
                return getPorductByIdService(product.name)
            })
            let nameResults = await Promise.all(namePromises) 
            chartOfTopSales = chartOfTopSales.map((product, index) => {
                 
                return {
                    name: nameResults[index]?.name || "product not found",
                    quantity: product.quantity
                }
            })
            
            // final result chart One
            chartOfTopSales = chartOfTopSales.filter((product) => product.name != "product not found")
            const hourCount : {[key:string]:number} = {}
            for (let i = 0; i <= 23; i++) {
                hourCount[i] = 0;
              }
            companyOrders.forEach((order) => {
                let hour = order.createdAt.getHours()
                if(hourCount[hour]){
                    hourCount[hour] += 1
                }else{
                    hourCount[hour] = 1
                }
            })
            // chart per hours
            let chartOfHourlyOrders = Object.keys(hourCount).map((hour) => {
                return {
                    hour: parseInt(hour),
                    count: hourCount[hour]
                }
            })
            return {topSaleChart:chartOfTopSales, hourlyOrdersChart:chartOfHourlyOrders}
    } catch (error) {
        console.log(error);
        throw error;
    }
}