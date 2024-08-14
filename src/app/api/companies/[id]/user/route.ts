import { getUserByCompanyIdService } from "../../services";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
        const companyId = params.id;
        const user = await getUserByCompanyIdService(companyId);
        if (!user) {
            return Response.json({ message: "company does not have any account linked" }, { status: 404 });

        }
        let userWithoutPassword:any = user;
        delete userWithoutPassword.password 

        return Response.json({
            data: userWithoutPassword,
            status: 200,
        });
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
  }