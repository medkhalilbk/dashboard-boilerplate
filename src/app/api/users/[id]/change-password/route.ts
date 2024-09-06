import { changePassword, getUserByIdService } from "../../services";
import jwt from "jsonwebtoken"
export async function PATCH(req:Request, { params }: { params: { id: string} }) {
    try {
    let body = await req.json();
    let { id } = params;
        if(!id) {
            return Response.json({ error: "Id n'existe pas" }, { status: 404 });
        }
        let { password , oldPassword} =  body;
        if(!password) {
            return Response.json({ error: "Le mot de passe est obligatoire" }, { status: 400 });
        }
        if(!oldPassword) {
            return Response.json({ error: "L'ancien mot de passe est obligatoire" }, { status: 400 });
        }
        let user = await getUserByIdService(id);
        if(user == null) {
            return Response.json({ error: "Utilisateur non trouvé" }, { status: 404 });
        }
        let updatedUser = await changePassword(id, password,oldPassword);
        if(updatedUser == null) {
            return Response.json({ error: "Erreur lors de la modification du mot de passe" }, { status: 500 });
        }
        return Response.json(updatedUser, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Erreur lors de la modification du mot de passe" }, { status: 500 });
    }
    
}