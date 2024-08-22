import { addProductToMenu, getAllProductsService } from "./services";

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        console.log(payload)
        const productAdded = await addProductToMenu(payload);
        if (!productAdded) {
            return Response.json({ error: "Error creating product id menu not found" }, { status: 404 });

        }
        return Response.json({
            message: "product created succesfully",
            data: productAdded,
            status: 200,
        });
    } catch (error: any) {
        return Response.json({ error: "Error creating product" }, { status: 500 });
    }
}



export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const products = await getAllProductsService(limit, page);
        if (!products) {
            return Response.json({ error: "there is no productus" }, { status: 404 });
        }
        return Response.json({
            data: products,
            status: 200,
        });
    } catch (error: any) {
        return Response.json({ error: "Error creating Company" }, { status: 500 });
    }
}
