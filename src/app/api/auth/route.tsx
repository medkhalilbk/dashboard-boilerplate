import { hashPassword, verifyPassword } from "@/lib/utils";
import { authService } from "./auth.service";
import { cookies } from "next/headers";
export async function POST(request: Request) { 
 try {
  const body = await request.json() ;     
  const login = await authService(body)
  cookies().set("token", login.token, {httpOnly: true, sameSite: "strict"})
  return Response.json({ message:"Login succeeded!" , data : login , status: 200 })
 } catch (error:any) { 
  return Response.json({ message:error.message}, { status: 500 })
 }
}