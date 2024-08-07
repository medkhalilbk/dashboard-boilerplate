import { addCartService, getAllCartsService } from "./services";

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const cartAdded = await addCartService(payload);
        if (!cartAdded) {
            return Response.json({ error: "Error creating cart, client or delivery man account not found" }, { status: 404 });
        }
        return Response.json({
            message: "Cart created successfully",
            data: cartAdded,
            status: 200,
        });
    } catch (error: any) {
        console.error(error);
        return Response.json({ error: "Error creating cart" }, { status: 500 });
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