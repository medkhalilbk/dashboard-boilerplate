
import { addUserService, getAllUsersService } from "./services"


export async function POST(request: Request) {
    try {
        const payload = await request.json()
        const user = await addUserService(payload)
        return Response.json({ message: "user creted !", data: user, status: 200 })
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 })
    }
}

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const users = await getAllUsersService(page, limit)
        if(!users.users){
            return Response.json({ message: "no users found !", status: 400 })
        }
        return Response.json({ message: "users found !", data: { users: users.users, pagination: users.pagination }, status: 200 })
    } catch (error:any) {
        return Response.json({ message: error.message }, { status: 500 })

    }
}


