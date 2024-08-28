import { validateUserEmailService } from "../../services";


export async function POST(request: Request, { params }: { params: { id: string } }) {
 try {
    let { id } = params;
    let { code } = await request.json();
    let updatedUser = await validateUserEmailService({id, emailCode: code});
    if (!updatedUser) {
        return Response.json({ error: "Email n'existe pas" }, { status: 404 });
    }
    return Response.json({
        message: "Votre email a été verifiée avec succès",
        data: updatedUser})
 } catch (error:any) {

    return Response.json({ error: error?.message }, { status: 500 });
 }
}