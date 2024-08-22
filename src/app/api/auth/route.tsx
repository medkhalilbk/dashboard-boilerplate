import { authService } from "./auth.service";
import { cookies } from "next/headers";
export async function POST(request: Request) { 
 try {
  const body = await request.json() ;     
  const login = await authService(body) 
  cookies().set("token", login.token, {secure:true,httpOnly: true, sameSite: "strict", maxAge:60 * 360})
  cookies().set("role", login.user.role, {httpOnly: true, sameSite: "strict",  maxAge:60 * 360})
  cookies().set("id", login.user.id, {httpOnly: true, sameSite: "strict",  maxAge:60 * 360})
  console.log(login.token)
  return Response.json({ message:"Login succeeded!" , data : login , status: 200 })
 } catch (error:any) { 
  return Response.json({ message:error.message}, { status: 500 })
 }
}