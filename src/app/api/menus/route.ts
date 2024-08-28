import { addMenuToCompanyService } from "../comapnies/menus/service"

export async function POST(request: Request){
    try {
        let payload = await request.json()
        
        console.log(payload)
        let menu = await addMenuToCompanyService(payload)
        return Response.json({
            message: "Menu created succesfully",
            data: menu,
            status: 200
        })
    } catch (error) {
        return Response.json({ error: "Error creating Company" }, { status: 500 });
    }
}