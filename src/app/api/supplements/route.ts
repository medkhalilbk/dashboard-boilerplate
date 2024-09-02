import {createSupplement, getAllSupplements} from './services'
export async function GET(request: Request){
    try {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const supplements = await getAllSupplements();
        if (!supplements) {
            return Response.json({ error: "Aucun supplements"  }, { status: 404 });
        }
        return Response.json({
            data: supplements,
            status: 200,
        });
    } catch (error: any) {
        return Response.json({ error: "Error creating Company" }, { status: 500 });
    }
}

export async function POST(request:Request){
    try {
        const payload = await request.formData(); 
        const supplement = await createSupplement(payload);
        if (!supplement) {
            return Response.json({ error: "Error creating supplement" }, { status: 404 });
        }
        return Response.json({
            message: "supplement created succesfully",
            data: supplement,
            status: 200,
        });
    } catch (error: any) {
        console.log(error)
        return Response.json({ error: "Error creating supplement" }, { status: 500 });
    }
}