import socket from "@/socket";
import { updateCartToStep5 } from "../../services";
import { sendNotificationToUser } from "@/lib/notifications";
import { getUserByIdService } from "@/app/api/users/services";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const updatedCart = await updateCartToStep5(id);
        if (!updatedCart) {
            return Response.json({ error: "Cart not found" }, { status: 404 });
        }       
        let user = await getUserByIdService(updatedCart.clientId)
        if(user){ 
            let sendNotification  = await sendNotificationToUser(user.pushToken as string,  "Votre commande est arrivée"  , "Le livreur est arrivé" )
        }
        return Response.json({
            message: "Cart updated successfully",
            status: 200,
        });
 
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Error updating cart" }, { status: 500 });
    }

}