import { createDeliveryManService, getAllDeliveryMenService } from "./services"


export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const userId = payload.userId; // Assuming userId is sent in the payload
        const deliveryManData = payload.deliveryManData; // Assuming deliveryManData is the data for creating a delivery man
        const { user, deliveryMan } = await createDeliveryManService(deliveryManData, userId);
        return Response.json({ message: "delivery man created!", data: { user, deliveryMan }, status: 200 });
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const deliveryMen = await getAllDeliveryMenService();
        return Response.json({ message: "delivery men found!", data: deliveryMen, status: 200 });
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}