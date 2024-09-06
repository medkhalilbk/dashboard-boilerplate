import { createSupplementService, getSupplementsByCompanyIdService } from "./services"



export async function GET(
    request:Request, {params}: {params: {id: string}}
){
    try{
        const companyId = params.id
        const supplements = await getSupplementsByCompanyIdService(companyId)
        if(!supplements){
            return Response.json({message: "supplements not found"}, {status: 404})
        }
        return Response.json({
            data: supplements,
            status: 200
        })
    }catch(error:any){
        return Response.json({message: error.message}, {status: 500})
    }
}

export async function POST(
    request:Request, {params}: {params: {id: string}}
){
    try{
        const companyId = params.id 
        const payload = await request.json()
        const supplementCreated = await createSupplementService({...payload, companyId})
        return Response.json({
            message: "supplement created successfully",
            data: supplementCreated,
            status: 201
        }) }
    catch(error:any){
        return Response.json({message: error.message}, {status: 500})
    }
}
        