import { getCartsHistoryByDeliveryMan } from "../../../services";


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const deliveryManId = params.id;
        const user = await getCartsHistoryByDeliveryMan(deliveryManId);
        return Response.json({
            message: "DeliveryManFound !",
            data: user,
            status: 200,
        });
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}