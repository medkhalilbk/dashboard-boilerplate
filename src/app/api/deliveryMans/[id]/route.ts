import {  getUserWithDeliveryMan } from "./services"


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const userId = params.id;
      const user = await getUserWithDeliveryMan(userId);
      return Response.json({
        message: "user updated !",
        data: user,
        status: 200,
      });
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 500 });
    }
  }
  