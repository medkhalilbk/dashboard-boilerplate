import {auth} from "@/auth";
import isValidJWT from "@/lib/session/jwt";
import { cookies } from "next/headers";
import { addStackService,updateStackService, deleteStackService, getStacksService } from "./stack.service";
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
   const stacks = await getStacksService();
    return Response.json({stacks:stacks, status: 200})
 
} catch (error) {
    return Response.json({message: "Server Error"}, {status: 500})
}
}) as any;

export const POST = auth( async (req) => {
    const token = cookies().get('token');  
    console.log(token?.value)
    const isValidToken = await isValidJWT(token?.value || "")
    if (token === undefined) {
        return Response.json({message: "Not authenticated"}, {status: 401})
    }
   if(!isValidToken){
    return Response.json({message: "Invalid token"}, {status: 401})
   }
   const body = await req.json();
   console.log(body)
   if(!body.name || !body.iconUrl){
         return Response.json({message: "Missing fields", status: 400}) 
   }
   const newStack = await addStackService({name: body.name, iconUrl: body.iconUrl, family: body.family});
   return Response.json({message: "Stack Added", stack:newStack , status: 200})
} ) as any;
 
export const PUT = auth( async (req) => {
    const token = cookies().get('token');  
    console.log(token?.value)
    const isValidToken = await isValidJWT(token?.value || "")
    if (token === undefined) {
        return Response.json({message: "Not authenticated"}, {status: 401})
    }
   if(!isValidToken){
    return Response.json({message: "Invalid token"}, {status: 401})
   }
   const body = await req.json();
   if(!body.id){
            return Response.json({message: "Missing Id", status: 400}) 
   }
    const updatedStack = await updateStackService(body);
return Response.json({message: "Stack informations updated" , stack:updatedStack, status: 200})
} ) as any;

export const DELETE = auth (async (req) => {
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
   const body = await req.json();
   if(!body.id){
            return Response.json({message: "Missing Id", status: 400}) 
   }
    const deletedStack = deleteStackService(body.id);
    return Response.json({message: "Stack Deleted", status: 200})
    } catch (error) {
        console.log(error)
    }
}) as any
 
