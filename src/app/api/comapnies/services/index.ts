import { ICompany } from "@/types/company";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllCompaniesService(page: number, limit: number) {
  try {
    const offset = (page - 1) * limit;
    const companies = await prisma.companies.findMany({
      skip: offset,
      take: limit,
    });
    const totalItems = await prisma.companies.count();
    const totalPages = Math.ceil(totalItems / limit);

    return {
      companies,
      pagination: {
        page,
        limit,
        totalPages,
        totalItems,
      },
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createCompanyService(company: ICompany) {
  try {
    const newCompany = await prisma.companies.create({
      data: company
    });
    return newCompany;
  } catch (error: any) {
    console.error("Error creating company:", error);
    throw JSON.parse(error);
  }
}

export async function getCompanyByIdService(id: string) {
  try {
    const company = await prisma.companies.findUnique({
      where: { id: id },
    });

    if (!company) {
      return null
    }
    const Menu = company.Menu.length > 0
      ? await prisma.menus.findMany({
        where: {
          id: {
            in: company.Menu,
          },
        },
      })
      : [];

    return {
      ...company,
      Menu,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function updateCompanyService(
  id: string,
  company: Partial<ICompany>
) {
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
