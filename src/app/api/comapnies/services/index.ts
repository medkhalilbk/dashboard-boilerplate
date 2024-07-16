import { Company, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllCompaniesService() {
  try {
    const companies = await prisma.company.findMany();
    return companies;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createCompanyService(company: Company) {
  try {
    const newCompany = await prisma.company.create({
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
    const company = await prisma.company.findUnique({ where: { id: id } });
    return company;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateCompanyService(id: string, company: Partial<Company>) {
  try {
    const companyUpdated = await prisma.company.update({
      where: { id },
      data: { ...company },
    });
    return companyUpdated;
  } catch (error) {
    throw error;
  }
}
