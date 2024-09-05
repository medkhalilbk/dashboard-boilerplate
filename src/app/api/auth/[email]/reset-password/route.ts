import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"


let prisma = new PrismaClient()
export async function POST(
    request:Request, {params}: {params: {email: string}}
){
    try{ 
        const email = params.email.trim()
        if(!email){
            return Response.json({message: "Email is required"}, {status: 400})
        }
        const user = await prisma.users.findFirst({
            where: {
                email: email,
                isDeleted:false,
                isEmailVerified:true
            }
        }) 
        if(!user){
            return Response.json({
                message: "Email sent", 
                status: 200 , 
                link:null
            })
        }
        let token = jwt.sign({id: user.id}, process.env.AUTH_SECRET || "ABC", {expiresIn: "30m"})
        
        let link = process.env.BASE_URL + "/auth/reset-password/" + token
        return Response.json({
            message: "Email sent",
            data:{
                link: link
            },
            status: 200
        })
    }catch(error:any){
        return Response.json({message: error.message}, {status: 500})
    }
}