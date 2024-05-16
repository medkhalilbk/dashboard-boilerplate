import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function authService({email,password} : {email:string,password:string}){ 
    const users = await prisma.user.findMany();
    console.log(users) 
  /*   if (!users) {
        throw new Error("User not found");
    } */
}