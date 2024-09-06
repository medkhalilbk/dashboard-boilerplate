import { createDeliveryManService, getAllDeliveryMenService } from "./services"


export async function POST(request: Request) {
    try {
        const payload = await request.json();
        console.log(payload)
        const userId = payload.userId; // Assuming userId is sent in the payload
        const deliveryManData = payload.deliveryManData; // Assuming deliveryManData is the data for creating a delivery man
        const { user, deliveryMan } = await createDeliveryManService(deliveryManData, userId);
        return Response.json({ message: "delivery man created!", data: { user, deliveryMan }, status: 200 });
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    try {
        const { deliveryMen, totalItems } = await getAllDeliveryMenService(page, limit);

        if (deliveryMen.length === 0) {
            return Response.json({ message: "Aucun livreurs existant!", status: 404 }, { status: 404 });
        }

        return Response.json({
            message: "Delivery men found!",
            data: {
                deliveryMans: deliveryMen,
                pagination: {
                    page,
                    limit,
                    totalPages: Math.ceil(totalItems / limit),
                    totalItems: totalItems, 

                },
            },
        }, {status:200} );
    } catch (error: any) {
        return Response.json({ message:error.message}, { status: 500 });
    }
}
