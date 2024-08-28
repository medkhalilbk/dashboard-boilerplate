import { getAllCompaniesService } from "../services";

export async function POST(request: Request) {
    try {
        let {coords} = await request.json();
        let companies = await getAllCompaniesService()
        if (!companies) {
            return Response.json({ error: "No companies found" }, { status: 404 });
        }
        return Response.json({ companies }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return Response.json({ error: "Error fetching carts" }, { status: 500 });
    }
}