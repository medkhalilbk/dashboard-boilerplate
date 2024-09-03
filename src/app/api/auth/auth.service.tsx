import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/utils";
import { verifyPassword } from "@/lib/utils";
import * as jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';

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
export async function authService({email,password,pushToken} : {email:string,password:string,pushToken?:string}) { 
   try { 
    const user = await prisma.users.findFirst({
        where: {  
            email,
            isEmailVerified:true,
        }
    }) 
    
    if (!user) {
        throw new Error("User not found");
    }
    console.log(user)
    if (!bcrypt.compareSync(password,user.password)) {
        throw new Error("Invalid password");
    } 
    delete (user as { password?: string }).password;
    if(user.role === "companyAdmin"){
        let token = jwt.sign({ id: user.id, companyId:user.companyId }, process.env.AUTH_SECRET || "ABC", { expiresIn: '1h' });
        return {user, token};
    }
    if(pushToken){
       let userUpdate = await prisma.users.update({
              where: { id: user.id },
              data: { pushToken: pushToken }
        })

        console.log("🚀 ~ authService ~ userUpdate:", userUpdate)

        
    }
    const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET || "ABC", { expiresIn: '1h' }); 
    return {user, token};
   } catch (error) {
    console.log(error)
    throw error;
   }
}