import {PrismaClient } from "@prisma/client";
import { getOrderByIdService } from "../../oders/services";

const prisma = new PrismaClient();

export async function getAllCompaniesService() {
  try {
    const companies = await prisma.companies.findMany();
    return companies;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createCompanyService(company: any) {
  try {
    const newCompany = await prisma.companies.create({
      data: {
        name: company.name,
        description: company.description,
        phoneNumber: company.phoneNumber,
        location: company.location,
        availabilityDistance: company.availabilityDistance,
        mainImage: company.mainImage,
        otherImages: company.otherImages,
        workHours: company.workHours,
        type: company.type,
        specialty: company.specialty,
        keywords: company.keywords,
        days: company.days,
      },
    });

    return newCompany;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
}

export async function getCompanyByIdService(id: string) {
  try {
    const company = await prisma.companies.findUnique({ where: { id: id } });
    return company;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProductsByCompanyIdService(companyId: string) {
  try {
    const products = await prisma.products.findMany({
      where: { companyId },
    });
    return products;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function updateCompanyService(id: string, company: any) {
  try {
    const companyUpdated = await prisma.companies.update({
      where: { id },
      data: { ...company },
    });
    return companyUpdated;
  } catch (error) {
    throw error;
  }
}

export async function getUserByCompanyIdService(companyId: string) {
  console.log(companyId)
  try {
    const user = await prisma.users.findFirst({
      where: {
        companyId: companyId,
      },
    }); 
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteCompanyService(id:string) {
  try {
    await prisma.companies.delete({ where: { id } });
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function getOrdersByCompanyIdService({ companyId }: { companyId: string }) {
  try {
    // Fetch all carts associated with the company
    let carts : any = await prisma.carts.findMany(); 
    let ordersArray: { id: string, data: any }[] = [];

    // Iterate through each cart
    for (const cart of carts) {
      if (!cart.orders.length) continue;

      // Collect all promises for the current cart's orders
      const orderPromises = cart.orders.map(async (order: any) => {
        const res = await getOrderByIdService(order);
        if (res) {
          ordersArray.push({ id: order, data: res });
        }
      });

      // Wait for all promises to resolve before proceeding
      await Promise.all(orderPromises);
    }
   /*  carts.forEach((el:any) => {
      if(el.orders.length){
        el.orders.forEach((id:any,i:number) => {
          el.orders[i] = ordersArray.filter(order => order.id == id)
        })
      } 
    }) */

    return carts
  } catch (error) {
    console.log(error);
  }
}
