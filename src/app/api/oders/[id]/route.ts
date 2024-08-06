import { getOrderByIdService, updateOrderByIdService } from "../services";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const orderId = params.id;
        const order = await getOrderByIdService(orderId);
        if (!order) {
            return Response.json({ error: "There is no order with that id" }, { status: 404 });
        }
        return Response.json({
            data: order,
            status: 200,
        });
    } catch (error) {
        return Response.json({ error: "Error fetching order" }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const orderId = params.id;
        const orderUpdates = await request.json();
        const order = await updateOrderByIdService(orderId, orderUpdates);
        if (!order) {
            return Response.json({ error: "There is no order with that id" }, { status: 404 });
        }
        return Response.json({
            data: order,
            status: 200,
        });
    } catch (error) {
        return Response.json({ error: "Error updating order" }, { status: 500 });
    }
}
