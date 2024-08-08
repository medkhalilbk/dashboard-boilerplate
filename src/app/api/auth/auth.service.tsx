import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/utils";
import { verifyPassword } from "@/lib/utils";
import * as jwt from "jsonwebtoken"
const prisma = new PrismaClient();

export async function signUpService({ email, password }: { email: string; password: string }) {  
    const verifyEmail = await prisma.users.findFirst({
        where: {
            email: email
        }
    })
    if (verifyEmail) {
        throw new Error("User already exists");
    }
    if(email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) === null){
        throw new Error("Invalid email");
    }
    if(password.length < 6){
        throw new Error("Password must be at least 6 characters long");
    }
    const encryptedPassword = hashPassword(password);
    const user = await prisma.users.create({
        data: {
            email: email,
            password: encryptedPassword,
            name: "",  
            role: "user",  
            isEmailVerified: false  
        }
    });
    return user;  
}
export async function authService({email,password} : {email:string,password:string}) {
   try {
    const user = await prisma.users.findFirst({
        where: {  
            email: email ,
            isEmailVerified:true,
        }
    })  
    if (!user) {
        throw new Error("User not found");
    }
    if (!verifyPassword(user.password, password)) {
        throw new Error("Invalid password");
    } 
    delete (user as { password?: string }).password;
    const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET || "ABC", { expiresIn: '1h' });
     
    return {user, token};
   } catch (error) {
    console.log(error)
    throw error;
   }
}