import { Istack } from "@/lib/features/stackSlice"

export interface IProject {
    id?:string,
    name:string,
    stacks:Istack[],
    link?:string
    github?:string
}