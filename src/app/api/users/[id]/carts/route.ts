import { getCardsByUserId } from "../../services";
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        let { id } = params;
        if(!id) {
            return Response.json({ error: "Id n'existe pas" }, { status: 404 });
        }
        let carts = await getCardsByUserId(id)
        if(carts  == null){
            return Response.json({ error: "Aucune carte trouvé" }, { status: 404 });
        }
        return Response.json(carts, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Erreur lors de la récupération des cartes" }, { status: 500 });
    }
}