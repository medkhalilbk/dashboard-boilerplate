import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function addStackService(stack:IStack){
    try {
        const newStack = await prisma.stacks.create({
            data: {
                name: stack.name,
                iconUrl: stack.iconUrl,
                family: stack.family
            }
        })
        return newStack;
    } catch (error) {
        throw new Error(error)
    }
}
export async function getStacksService(){
    try {
        const stacks = await prisma.stacks.findMany();
        return stacks;
    } catch (error) {
        throw new Error(error)
    }
}
export async function updateStackService(stack:IStack){
    try {
        const updatedStack = await prisma.stacks.update({
            where: {id: stack.id},
            data: {
                name: stack.name,
                iconUrl: stack.iconUrl,
                family: stack.family
            }
        })
        return updatedStack;
    } catch (error) {
        throw new Error(error)
    }
}
export async function deleteStackService(id:string){
    try {
        const deletedStack = await prisma.stacks.delete({
            where: {id}
        })
        return deletedStack;
    } catch (error) {
        throw new Error(error)
    }
}