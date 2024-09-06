 
import { Prisma } from "@prisma/client";
import { updateOrdersByCartId } from "../../services"; 
import { io } from "socket.io-client";
const socket = io(process.env.SOCKET_URL as string , {
  transports: ["polling"], 
});
export async function POST(request: Request, { params }: { params: { id: string } }) {
    try { 
        const companyId = params.id;
        let body = await request.json()
        let {cartId,deliveryManId} = body 
        let updatedOrders = await updateOrdersByCartId(cartId,companyId)  
        socket.emit("companies-update", {type: "order-ready", companyId: companyId,cartId:cartId,deliveryManId:deliveryManId});
        return Response.json({
            message: "Votre commande a été marquée comme prête",
            status: 200,
        })
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 500 });
    }
  }