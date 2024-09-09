import  { getAllUnsignedCarts } from "../services";

export async function GET(request: Request)
 {
    try { 
         let carts =  await getAllUnsignedCarts()
            console.log("hi")
            console.log("🚀 ~ getAllUnsignedCarts:", carts)

            return Response.json({
                message: "All Carts Found !",
                data: carts,
                status: 200,})
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
}