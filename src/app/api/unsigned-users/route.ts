import { getAllUsersService } from "../users/services";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const Allusers = await getAllUsersService()
        if(!Allusers.users){
            return Response.json({ message: "no users found !", status: 400 })
        }
        const filtredUsers = Allusers.users.filter(u => u.companyId == undefined && u.deliveryManId == undefined)
        return Response.json({ message: "users found !", data: { users: filtredUsers }, status: 200 })
    } catch (error:any) {
        return Response.json({ message: error.message }, { status: 500 })

    }
}