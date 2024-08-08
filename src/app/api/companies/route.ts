import { DELETE } from './../stacks/route';
import { createCompanyService, getAllCompaniesService } from "./services";

export async function GET(request: Request) {
  try {
    const companies = await getAllCompaniesService();
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
    return Response.json({ message: error.message }, { status: 500 });
  }
}
 