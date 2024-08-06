import { signUpService } from "../auth/auth.service";
export async function POST(request: Request) { 
 try {
  const body = await request.json() ;     
  const user = await signUpService({ email: body.email, password: body.password })
  return Response.json({ message:"user creted !" , data : user , status: 200 })
 } catch (error:any) { 
  return Response.json({ message:error.message}, { status: 500 })
 }
}