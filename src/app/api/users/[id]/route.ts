import { getUserByIdService, updateUserService } from "../services";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const body = await request.json();
    const user = await updateUserService(userId, body);
    return Response.json({
      message: "user updated !",
      data: user,
      status: 200,
    });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const user = await getUserByIdService(userId);
    return Response.json({
      message: "user updated !",
      data: user,
      status: 200,
    });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}
