import { getAllMenusOfCompanyService } from "@/app/api/comapnies/menus/service";


export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
      const companyId = params.id;
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page') || '1', 10);
      const limit = parseInt(url.searchParams.get('limit') || '10', 10);
      const menus = await getAllMenusOfCompanyService(companyId, page, limit);
      if (!menus) {
        return Response.json({
          data: "No menu found under this company id",
          status: 404,
        });
      }
      return Response.json({
        data: menus,
        status: 200,
      });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 500 });
    }
  }