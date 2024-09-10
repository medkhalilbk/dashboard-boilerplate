import { getCartByIdService, getCartDetailsService, updateCartByIdService } from "../../services"; 
import { CartStatus } from "@/types/cart";
import { getUserByIdService } from "@/app/api/users/services"; 
import { getOrderByIdService, updateOrderByIdService } from "@/app/api/oders/services";
import { OrderStatus } from "@/types/order";
export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const payload = await request.json(); 
        const orders = payload.orders;
        let promiseUpdateOrders = orders.map((o:any) => updateOrderByIdService(o as string, {status:"Collected" as OrderStatus.Collected}));
        let responses = await Promise.all(promiseUpdateOrders);
        // check if all orders are done 
        let detailedCart = await getCartDetailsService(id);
        detailedCart.orders.every((o:any) => o.status === OrderStatus.Collected) ? await updateCartByIdService(id, {status: CartStatus.step4}) : null;
        
        return Response.json({
            message: "Cart updated successfully",
            data: responses,
            status: 200,
        });
    } catch (error: any) {
        console.error(error);
        return Response.json({ error: "Error updating cart" }, { status: 500 });
    }
}