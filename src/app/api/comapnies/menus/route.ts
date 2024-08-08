import { addMenuToCompanyService } from "./service";

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const menu = await addMenuToCompanyService(payload);
        return Response.json({
            message: "Menu created succesfully",
            data: menu,
            status: 200,
        });
    } catch (error: any) {
        return Response.json({ error: "Error creating Company" }, { status: 500 });
    }
}
