import { createCompanyService, getAllCompaniesService,  } from "./services";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    const companies = await getAllCompaniesService(page, limit);
    return Response.json({
      data: companies,
      status: 200,
    });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    console.log(payload);
    const companyCreated = await createCompanyService(payload);
    return Response.json({
      message: "Company created succesfully",
      data: companyCreated,
      status: 200,
    });
  } catch (error: any) {
    return Response.json({error:"Error creating Company"}, { status: 500 });
  }
}
