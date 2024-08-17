import { getMenuByIdService } from "../../service";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const menuId = params.id;
        const menu = await getMenuByIdService(menuId);
        if (!menu) {
            return Response.json({
                data: "No menu found  ",
                status: 404,
            });
        } 
        return Response.json({
            data: menu,
            status: 200,
        });
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });

    }
}


