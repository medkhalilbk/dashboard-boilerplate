import { getCompanyById, updateCompany } from "../services";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const companyId = params.id;
    const company = await getCompanyById(companyId);
    return Response.json({
      data: company,
      status: 200,
    });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const companyId = params.id;
    const payload = await request.json();
    const companyUpdated = await updateCompany(companyId, payload);
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
