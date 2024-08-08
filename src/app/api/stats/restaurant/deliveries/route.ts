import { getDeliveriesPerRestaurantPerMonth } from "../../services";

export async function GET(request: Request) {
    try {
        const response = await getDeliveriesPerRestaurantPerMonth()
        return Response.json({
            data: response,
            status: 200,
        });
    } catch (error) {
        return Response.json({ message: error }, { status: 500 });
    }
}
