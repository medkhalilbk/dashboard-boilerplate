import {deleteSupplement, getSupplementById, updateSupplement} from "../services";
export async function GET(request:Request , { params }: { params: { id: string } }) {
    try {
        let { id } = params; 
        const supplement = await getSupplementById(id)
        if (!supplement) {
            return Response.json({ error: "supplement not found" }, { status: 404 });
        }
    } catch (error) {
        return Response.json({ error: error }, { status: 500 });
    }
}
export async function PATCH(request:Request , { params }: { params: { id: string } }) {
    try {
        let { id } = params; 
        const payload = await request.json();
        const supplement = await updateSupplement(id, payload);
        if (!supplement) {
            return Response.json({ error: "Error updating supplement" }, { status: 404 });
        }
        return Response.json({
            message: "supplement updated succesfully",
            data: supplement,
            status: 200,
        });
    } catch (error) {
        return Response.json({ error: "Error updating supplement" }, { status: 500 });
    }
}

export async function DELETE(request:Request , { params }: { params: { id: string } }) {
    try {
        let { id } = params;
        const supplement = await deleteSupplement(id);
        if (!supplement) {
            return Response.json({ error: "Error deleting supplement" }, { status: 404 });
        }
    } catch (error) {
        return Response.json({error: error}, { status: 500 });
    }
}