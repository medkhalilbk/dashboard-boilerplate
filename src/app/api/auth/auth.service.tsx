import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/utils";
import { verifyPassword } from "@/lib/utils";
import * as jwt from "jsonwebtoken"
const prisma = new PrismaClient();

export async function signUpService({ email, password }: { email: string; password: string }) {  
    const verifyEmail = await prisma.users.findUnique({
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
            password: encryptedPassword  , 
            date: new Date()
        }
    });
    return user;  
}
export async function authService({email,password} : {email:string,password:string}) {
    const user = await prisma.users.findUnique({
        where: {
            email: email
        }
    })
    if (!user) {
        throw new Error("User not found");
    }
    if (!verifyPassword(user.password, password)) {
        throw new Error("Invalid password");
    } 
    delete user.password;
    const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, { expiresIn: '1h' });
     
    return {user, token};
}