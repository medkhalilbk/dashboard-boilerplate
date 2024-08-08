import { getPorductByIdService, updatePorductByIdService } from "../services";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const productId = params.id;
        const product = await getPorductByIdService(productId)
        if (!product) {
            return Response.json({ error: "there is no productu with that id" }, { status: 404 });
        }
        return Response.json({
            data: product,
            status: 200,
        });
    } catch (error) {
        return Response.json({ error: "Error creating Company" }, { status: 500 });

    }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const productId = params.id;
        const productUpdates = await request.json();
        const product = await updatePorductByIdService(productId, productUpdates)
        if (!product) {
            return Response.json({ error: "there is no productu with that id" }, { status: 404 });
        }
        return Response.json({
            data: product,
            status: 200,
        });
    } catch (error) {
        return Response.json({ error: "Error creating Company" }, { status: 500 });

    }
}