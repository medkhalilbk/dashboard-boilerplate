import {auth} from "@/auth";
import isValidJWT from "@/lib/session/jwt";
import { cookies } from "next/headers";

export const GET = auth( async (req) => {
try {
    const token = cookies().get('token');  
    console.log(token?.value)
    const isValidToken = await isValidJWT(token?.value || "")
    if (token === undefined) {
        return Response.json({message: "Not authenticated"}, {status: 401})
    }
   if(!isValidToken){
    return Response.json({message: "Invalid token"}, {status: 401})
   }
    return Response.json({message: "Authenticated", status: 200})
 
} catch (error) {
    return Response.json({message: "Server Error"}, {status: 500})
}
}) as any;