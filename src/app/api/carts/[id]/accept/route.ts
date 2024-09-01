import { getDeliveryManByUserIdService } from "@/app/api/deliveryMans/services";
import { updateCartByIdService } from "../../services";

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const payload = await request.json(); 
        const updatedCart = await updateCartByIdService(id, {status:"step1",deliveryManAccountId:payload.deliveryManId} );
        console.log(updatedCart)
        if (!updatedCart) {
            return Response.json({ error: "Cart not found" }, { status: 404 });
        }
        return Response.json({
            message: "Cart updated successfully",
            data: updatedCart,
            status: 200,
        });
    } catch (error: any) {
        console.error(error);
        return Response.json({ error: "Error updating cart" }, { status: 500 });
    }
}