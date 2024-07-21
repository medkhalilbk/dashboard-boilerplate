import { getCompanyByIdService, updateCompanyService } from "../services";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const companyId = params.id;
    const company = await getCompanyByIdService(companyId);
    return Response.json({
      data: company,
      status: 200,
    });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const companyId = params.id;
    const payload = await request.json();
    const companyUpdated = await updateCompanyService(companyId, payload);
    return Response.json({
      message: "company updated succesffully",
      data: companyUpdated,
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
