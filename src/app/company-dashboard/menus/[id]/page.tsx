"use client"
import { Input } from "@/components/ui/input"
import { setMenus } from "@/lib/features/MenuSlice"
import { RootState } from "@/lib/store"
import { IMenu } from "@/types/menu"
import axios from "axios"
import { useParams, useSearchParams } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux" 
export default function EditMenuPage() {
     const dispatch = useDispatch()
     const {id} = useParams()
     let selectedMenu = useSelector((state:RootState) => state.menus.data).filter((menu:IMenu) => menu.id == id)
     React.useEffect(()=> {
          if(selectedMenu.length == 0 ){
            if(typeof window !== 'undefined'){
                let id = localStorage.getItem('id')
                axios.get(`/api/companies/${id}/menu`).then((res) => { 
                dispatch(setMenus(res.data.data.menus))
                setValue("name" , res.data.data)
                }).catch((err) => {
                console.log(err)
                })
            }
          }
     } , [])
     const { handleSubmit, control,setValue, register, formState: { errors } , getValues } = useForm<IMenu>({
        defaultValues:{
            name:selectedMenu[0]?.name,
            isActive:selectedMenu[0]?.isActive
        }
    })
    return <> <form className="space-y-6 w-2/3 mx-auto mt-5"><Input {...register("name")}/></form> </>
}