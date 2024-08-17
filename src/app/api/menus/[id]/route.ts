import { deleteMenuByIdService, getAllMenusOfCompanyService, getMenuByIdService, updateMenuService } from "../../comapnies/menus/service";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const menuId = params.id;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const menus = await getMenuByIdService(menuId);
    if (!menus) {
      return Response.json({
        data: "No menu found under this id",
        status: 404,
      });
    }
    console.log(menus)
    return Response.json({
      data: menus,
      status: 200,
    });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}



export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const menuId = params.id;
    const payload = await request.json();

    const menu = await updateMenuService(menuId, payload)
    if (!menu) {
      return Response.json({
        data: "No menu found under this menu id ",
        status: 404,
      });
    }
    return Response.json({
      data: menu,
      status: 200,
    });

  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });

  }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const menuId = params.id;
    const menu = await deleteMenuByIdService(menuId);
    if (!menu) {
      return Response.json({
        data: "No menu found  ",
        status: 404,
      });
    }
    return Response.json({
      data: menu,
      status: 200,
    });
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });

  }
}


