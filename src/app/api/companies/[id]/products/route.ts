import { getOrdersByCompanyIdService, getProductsByCompanyIdService } from "../../services";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ){
    try {
       let products = await  getProductsByCompanyIdService(params.id)
        return Response.json({
            data: products,
            status: 200,
        });
    } catch (error: any) {
        return Response.json({ message: "error" }, { status: 500 });
    }
}