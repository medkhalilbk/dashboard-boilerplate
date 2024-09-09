import { getAllUnsignedCarts } from "@/app/api/carts/services";
import { getCartsByDeliveryMan } from "../../services";


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const deliveryManId = params.id;
        const carts = await getCartsByDeliveryMan(deliveryManId);
        const unsignedCarts = await getAllUnsignedCarts()
        return Response.json({
            message: "Carts found successfully",
            assigned: carts,
            unsisgned: unsignedCarts,
            status: 200,
        });
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}