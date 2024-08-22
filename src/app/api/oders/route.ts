import { addOrderService, getAllOrdersService } from "./services";

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const orderAdded = await addOrderService(payload);
        console.log(payload)
        if (!orderAdded) {
            return Response.json({ error: "Error creating order, product or restaurant not found" }, { status: 404 });
        }
        return Response.json({
            message: "Order created successfully",
            data: orderAdded,
            status: 200,
        });
    } catch (error: any) {
        console.log(error)
        return Response.json({ error: "Error creating order" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const orders = await getAllOrdersService(limit, page);
        if (!orders) {
            return Response.json({ error: "There are no orders" }, { status: 404 });
        }
        return Response.json({
            data: orders,
            status: 200,
        });
    } catch (error: any) {
        return Response.json({ error: "Error fetching orders" }, { status: 500 });
    }
}
