import { getStatsByCompanyIdService } from "../supplements/services"

export async function GET(
    request:Request, {params}: {params: {id: string}}
){
    try{
        const companyId = params.id
        const stats = await getStatsByCompanyIdService(companyId)
        if(!stats){
            return Response.json({message: "stats not found"}, {status: 404})
        }
        return Response.json({
            data: stats,
            status: 200
        })
    }catch(error:any){
        return Response.json({message: error.message}, {status: 500})
    }
}