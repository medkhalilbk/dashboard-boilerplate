import { NextApiRequest } from "next"
import { PrismaClient } from '@prisma/client' 
import bcrypt from 'bcrypt'

export async function POST(
    req: NextApiRequest,
  ) {

  try { 
    const prisma = new PrismaClient()
    const { username, password } = req.body
    const hashedPassword =  bcrypt.hashSync(password,10 ,)
 /*    if(!hashedPassword) {
      throw new Error('Password cannot be hashed')
    } */
/*     const user = await prisma.user.create({
      data:{ 
        email: "username",
        password: "hashedPassword",
        date : Date.now()
      } , 
    })
    if(!user) {
      throw new Error('User cannot be created')
    } */
    return new Response(hashedPassword)
    return new Response(JSON.stringify({ user: user, message: "User created" }), { status: 200 })
  } catch (error:any) {
    console.log(error)
    return new Response(error.message, {status: 400})
  }

    /* return new Response({...req.body, password: bcrypt.hashSync(req.body.password, 10)}) */
  }

