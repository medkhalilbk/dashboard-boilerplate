
import { changePassword, getUserByIdService, updateUserService } from "../../services";
import jwt from "jsonwebtoken"
export async function PATCH(req:Request, { params }: { params: { id: string} }) {
    try {
        let body = await req.json();
        let auth =  req.headers.get("authorization"); 
        if(!auth) {
            return Response.json({ error: "Non autorisé" }, { status: 401 });
        }
        let token = auth.split(" ")[1];
        if(!token) {
            return Response.json({ error: "Non autorisé" }, { status: 401 });
        }
        if(!jwt.verify(token, process.env.AUTH_SECRET as string)) {
            return Response.json({ error: "Non autorisé" }, { status: 401 });
        
        }
        let { id } = params;
        if(!id) {
            return Response.json({ error: "Id n'existe pas" }, { status: 404 });
        }
        let updatedUser = await updateUserService(id, body);
        if(updatedUser == null) {
            return Response.json({ error: "Erreur lors de la modification du mot de passe" }, { status: 500 });
        }
        return Response.json(updatedUser, { status: 200 });

    } catch (error) {
        return Response.json({ error: "Erreur lors de la modification du mot de passe" }, { status: 500 });
    }
    
}