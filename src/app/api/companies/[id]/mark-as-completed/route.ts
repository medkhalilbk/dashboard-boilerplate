 
import { Prisma } from "@prisma/client";
import { updateOrdersByCartId } from "../../services";
import socket from "@/socket";
export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
     
        const companyId = params.id;
        let body = await request.json()
        let {cartId} = body
        let updatedOrders = await updateOrdersByCartId(cartId,companyId)  
        socket?.emit("deliveryMan-update", {type: "update", companyId: companyId});
        return Response.json({
            message: "Votre commande a été marquée comme prête",
            status: 200,
        })
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 500 });
    }
  }