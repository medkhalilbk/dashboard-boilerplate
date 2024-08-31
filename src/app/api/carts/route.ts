import Error from "next/error";
import { addCartService, getAllCartsService, getNearestDeliveryMans, groupCompaniesByDistance } from "./services";
import { addOrderService } from "../oders/services";

export async function POST(request: Request) {
    try {
        
        const payload = await request.json();

        console.log("🚀 ~ POST ~ payload:", payload)

        const {clientId} = payload;
        const userLocation = payload.location
        const ordersPromises = payload.orders.map((order: any) => addOrderService(order));
        const orders = await Promise.all(ordersPromises)   ; 
      
        const companiesData = await groupCompaniesByDistance(payload.companiesIds as string[]);  
        
        let deliveryMans = await getNearestDeliveryMans(companiesData,orders,clientId,userLocation); 
         
        return Response.json({ deliveryMans }, {status:200});
    } catch (error : any) { 
        if(error.message == "Aucun livreurs présents."){
            return Response.json({ error: "Aucun livreurs est présents." }, { status: 404 });
        }
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