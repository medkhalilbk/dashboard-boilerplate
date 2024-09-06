import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();


export async function getAllSupplements(companyId?:string){
    try {
        if(companyId){
            const supplements = await prisma.supplements.findMany({
                where:{companyId:companyId}
            });
            return supplements;
        }
        const supplements = await prisma.supplements.findMany();
        return supplements;
    } catch (error: any) {
        console.log(error)
        throw error
    } 
}

export async function getSupplementById(id: string){
    try {
        const supplement = await prisma.supplements.findUnique({
            where:{id:id}
        })
        if (!supplement) {
            return null
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function createSupplement(payload: FormData){
    try {
        let name = payload.get("name") as string
        let price = payload.get("price") as string
        let image = payload.get("image") as File
        let companyId = payload.get("companyId") as string
        let formData = new FormData()
        formData.append("file" , image)
        let sendImageRequest = await fetch(process.env.API_URL + "/upload", {
            method: "POST",
            body: formData
        }) 
        let imageResponse = await sendImageRequest.json()
        if (!sendImageRequest.ok) {
            throw new Error("Error uploading image")
        }
        let supplement = await prisma.supplements.create({
            data: {
                name: name,
                price: parseFloat(price),
                img: imageResponse.URL as string,
                companyId:companyId
            }
        })
       
        return supplement
    } catch (error: any) {
        console.log(error)
        throw error
    }
}
export async function updateSupplement(id: string, payload: any){
    try {
        const supplement = await prisma.supplements.update({
            where:{id:id},
            data: payload
        })
        return supplement
    } catch (error: any) {
        console.log(error)
        throw error
    }
}

export async function deleteSupplement(id: string){
    try {
        const supplement = await prisma.supplements.delete({
            where:{id:id}
        })
        return supplement
    } catch (error: any) {
        console.log(error)
        throw error
    }
}