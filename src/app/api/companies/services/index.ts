import {PrismaClient } from "@prisma/client";

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