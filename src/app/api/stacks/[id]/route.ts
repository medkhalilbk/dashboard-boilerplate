import { NextRequest, NextResponse } from "next/server";
import { deleteStackService, updateStackService } from "../stack.service";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) { 
  try {
  const {id} = params 
  const body = await req.json();
  await updateStackService({id, name: body.name, iconUrl: body.iconUrl, family: body.family});
  return NextResponse.json({message: "Stack updated", status: 200})
  } catch (error) {
  return NextResponse.json({message: "Server Error"}, {status: 500})  
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) { 
    try {
    const {id} = params 
    const body = await req.json();
    await deleteStackService(id);
    return NextResponse.json({message: "Stack Deleted", status: 200})
    } catch (error) {
    return NextResponse.json({message: "Server Error"}, {status: 500})  
    }
  }