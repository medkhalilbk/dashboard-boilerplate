import { getOrdersByCompanyIdService } from "../../services";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ){
    try {
       let orders = await getOrdersByCompanyIdService({companyId:params.id})
        return Response.json({
            data: orders,
            status: 200,
        });
    } catch (error: any) {
        return Response.json({ message: "error" }, { status: 500 });
    }
}