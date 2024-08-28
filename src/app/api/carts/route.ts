import Error from "next/error";
import { addCartService, getAllCartsService, getNearestDeliveryMans, groupCompaniesByDistance, notifyCompanyViaWeb } from "./services";
import { addOrderService } from "../oders/services";

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const {clientId} = payload;
        const userLocation = payload.location
        const ordersPromises = payload.orders.map((order: any) => addOrderService(order));
        const orders = await Promise.all(ordersPromises)   ; 
        
        console.log("🚀 ~ POST ~ orders:", orders)

        

        const companiesData = await groupCompaniesByDistance(payload.companiesIds as string[]);  
        let deliveryMans = await getNearestDeliveryMans(companiesData,orders,clientId,userLocation); 
         let emitForCompany =  await notifyCompanyViaWeb({carts:deliveryMans?.carts});
        return Response.json({ deliveryMans }, {status:200});
    } catch (error : any) { 
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const carts = await getAllCartsService(limit, page);
        if (!carts) {
            return Response.json({ error: "There are no carts" }, { status: 404 });
        }
        return Response.json({
            data: carts,
            status: 200,
        });
    } catch (error: any) {
        console.error(error);
        return Response.json({ error: "Error fetching carts" }, { status: 500 });
    }
}