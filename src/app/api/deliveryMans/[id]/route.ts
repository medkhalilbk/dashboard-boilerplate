import { deleteDeliveryManService, getDeliveryManByUserIdService, updateDeliveryManService } from "../services";


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const user = await getDeliveryManByUserIdService(userId);
    return Response.json({
      message: "DeliveryManFound !",
      data: user,
      status: 200,
    });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request,
  { params }: { params: { id: string } }) {
  try {
    const deliveryManId = params.id;
    const body = await request.json();
    console.log(deliveryManId, body)
    const deliveryMan = await updateDeliveryManService(deliveryManId, body)
    if (!deliveryMan) {
      return Response.json({ message: "DeliveryMan not found" }, { status: 404 })
    }
    return Response.json({ message: "DeliveryMan updated !", data: deliveryMan }, { status: 200 })

  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });

  }
}
export async function DELETE(request: Request,
  { params }: { params: { id: string } }) {
  try {
    const deliveryManId = params.id;
    const deliveryMan = await deleteDeliveryManService(deliveryManId)
    if (!deliveryMan) {
      return Response.json({ message: "DeliveryMan not found" }, { status: 404 })
    }
    return Response.json({ message: "DeliveryMan deleted !", data: deliveryMan }, { status: 200 })

  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });

  }
}
