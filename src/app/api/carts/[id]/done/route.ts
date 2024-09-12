import socket from "@/socket";
import { updateCartToStep5 } from "../../services"; 
import { getUserByIdService } from "@/app/api/users/services";
import { notificationUser } from "@/lib/notifications/notification";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const updatedCart = await updateCartToStep5(id);
        if (!updatedCart) {
            return Response.json({ error: "Cart not found" }, { status: 404 });
        }       
        let user = await getUserByIdService(updatedCart.clientId)
        let notify = await notificationUser({
            token: user?.pushToken,
            body: "🎉 Votre commande est arrivée 🚴",
            title: "Commande Livrée"
        })
        return Response.json({
            message: "Cart updated successfully",
            status: 200,
        });
 
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Error updating cart" }, { status: 500 });
    }

}