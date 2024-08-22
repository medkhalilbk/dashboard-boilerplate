import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getSupplementsByCompanyIdService(companyId: string) {
    try {
        const supplements = await prisma.supplements.findMany({
        where: { companyId },
        });
        return supplements;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getSupplementByIdService(id: string) {
    try {
        const supplement = await prisma.supplements.findUnique({ where: { id: id } });
        return supplement;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createSupplementService(supplement: any) {
    try {
        const supplementCreated = await prisma.supplements.create({
            data: { ...supplement },
        });
        return supplementCreated;
    } catch (error) {
        throw error;
    }
}

export async function updateSupplementService(id: string, supplement: any) {
    try {
        const supplementUpdated = await prisma.supplements.update({
            where: { id },
            data: { ...supplement },
        });
        return supplementUpdated;
    } catch (error) {
        throw error;
    }
}