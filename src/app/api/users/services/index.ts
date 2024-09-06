import { IUser } from "@/types/User";
import { ICart } from "@/types/cart";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function addUserService(user: IUser) {
  try {

    const verifyEmailExists = await prisma.users.findFirst({
      where:{
        email: user.email
      }
    })

    if(verifyEmailExists){
      throw new Error('Email existe déja')
    }


    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const emailCode = emailTo6DigitNumber(user.email);
    const response = await prisma.users.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
        phoneNumber: user.phoneNumber,
        pushToken:user.pushToken,
        companyId: user.companyId,
        isEmailVerified: user.isEmailVerified,
        deliveryAddress: user.deliveryAddress,
        imgUrl: user.imgUrl,
        emailCode: emailCode
      }
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
function emailTo6DigitNumber(email:string) {
    // Step 1: Remove non-alphanumeric characters
    let alphanumeric = email.replace(/[^a-zA-Z0-9]/g, '');

    // Step 2: Convert letters to digits
    let digits = '';
    for (let i = 0; i < alphanumeric.length; i++) {
        let char = alphanumeric.charAt(i);
        if (/[a-zA-Z]/.test(char)) {
            // Convert letter to digit (A=1, ..., Z=26) and mod 10
            let digit = (char.toLowerCase().charCodeAt(0) - 96) % 10;
            digits += digit;
        } else {
            digits += char;
        }
        // Stop when we have 6 digits
        if (digits.length >= 6) {
            break;
        }
    }

    // Step 3: Ensure exactly 6 digits
    if (digits.length < 6) {
        // Pad with zeros if less than 6 digits
        digits = digits.padEnd(6, '0');
    }

    return digits.substring(0, 6);
}

export async function validateUserEmailService({id,emailCode} : {id:string,emailCode:string}) {
  try { 
    if(!id) return null 
    const user = await prisma.users.findUnique({
      where: {
        id 
      }
    })
    if(user?.isEmailVerified) {
       throw new Error("Email a été déja vérifié")
    }
    if(!user) return null
    const response = await prisma.users.update({
      where: {
        id
      },
      data: {
        isEmailVerified: true
      }
    })
    return response
  } catch (error) {
    throw error
  }

}

export async function updateUserService(id: string, data: Partial<IUser>) {
  try {
    console.log(data)
    if(data.password){
      data.password = await bcrypt.hash(data.password, 10);
    }
    if(data.email){
      const userMail = await prisma.users.findFirst({
        where:{
          email: data.email,
          id:{
            not: id
          }
        } 
      })
      if(userMail){
        throw new Error('Email existe déja')
      }
    }
    const user = await prisma.users.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    if (!user) {
      return null
    }
    return user;
  } catch (error) {
    throw error
  }
}

export async function getAllUsersService(page?: number, limit?: number) {
  try {
   
  if(limit && page){
    const offset = (page - 1) * limit;

    const users = await prisma.users.findMany({
      skip: offset,
      take: limit,
    
    });
    const totalItems = await prisma.companies.count();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      users,
      pagination: {
        page,
        limit,
        totalPages,
        totalItems,
      },
    };
  }else{
    const users = await prisma.users.findMany()
    return {
        users
    }
  }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getUserByIdService(id: string) {
  const user = await prisma.users.findUnique({ where: { id, isDeleted: false } });
  if (!user) return null
  return user;
}

export async function deleteUserService(id: string) {
  try {
    const user = await prisma.users.update({
      where: { id },
      data: {
        isDeleted: true,
        updatedAt: new Date(),
      },
    });
    return user;
  } catch (error) {
    throw error
  }
}

export async function getCardsByUserId(id: string) {
  try {
    const carts = await prisma.carts.findMany({
      where: {
        clientId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (carts.length === 0) {
      return null;
    }

    const cartsWithOrders = await Promise.all(
      carts.map(async (cart: any) => {
        const orders = await prisma.orders.findMany({
          where: {
            id: {
              in: cart.orders,
            },
          },
        });
        const names  = await prisma.companies.findMany({
          where:{
            id:{
              in:cart.companiesIds
            }
          }
        })
        cart.companies = names
        return { ...cart, orders };
      })
    ); 
    const cartWithOrderAndProduct = await Promise.all(
      cartsWithOrders.map(async (cart: any) => {
        const ordersWithProduct = await Promise.all(
          cart.orders.map(async (order: any) => {
            const product = await prisma.products.findUnique({
              where: {
                id: order.productId,
              },
            });
            return { ...order, product };
          })
        ) 
  
        return { ...cart, orders: ordersWithProduct };
      }
      )
    )
    return cartWithOrderAndProduct;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function changePassword(id: string, password: string,oldPassword:string) {
  try {
    let newHashedPassword = await bcrypt.hash(password, 10);
    let user = await prisma.users.findUnique({
      where:{
        id:id
      }
    })
    if(!user){
      throw new Error('Utilisateur non trouvé')
    }
    if(!bcrypt.compareSync(oldPassword,user.password)){
      throw new Error('Mot de passe incorrect')
    }
    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        password: newHashedPassword,
        updatedAt: new Date(),
      },
    });
    return updatedUser  
  } catch (error) {
    console.log(error)
    throw error
  }
}