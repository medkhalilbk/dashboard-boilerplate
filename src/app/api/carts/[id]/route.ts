import { deleteCartByIdService, updateCartByIdService } from "../services";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const payload = await request.json();
        const updatedCart = await updateCartByIdService(id, payload);
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const deletedCart = await deleteCartByIdService(id);
        if (!deletedCart) {
            return Response.json({ error: "Cart not found" }, { status: 404 });
        }
        return Response.json({
            message: "Cart deleted successfully",
            data: deletedCart,
            status: 200,
        });
    } catch (error: any) {
        console.error(error);
        return Response.json({ error: "Error deleting cart" }, { status: 500 });
    }
}