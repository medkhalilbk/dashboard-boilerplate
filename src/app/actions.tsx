"use server"
import { cookies } from 'next/headers' 
export async function deleteCookies(){
    try{
        cookies().delete("role")
        cookies().delete("id")
        cookies().delete("token")
    }catch{
        throw new Error("Error deleting cookies")
    }
}