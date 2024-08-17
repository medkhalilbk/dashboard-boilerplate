"use client"
import { Input } from "@/components/ui/input"
import FoodCard from "@/components/ui/product/MenuProductCard"
import ProductCard from "@/components/ui/product/productCard"
import { Switch } from "@/components/ui/switch"
import { setMenus } from "@/lib/features/MenuSlice"
import { RootState } from "@/lib/store"
import { IMenu } from "@/types/menu"
import axios from "axios"
import { useParams, useSearchParams } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux" 
export default function EditMenuPage() { 
     const {id} = useParams()
     let menuFromRedux = useSelector((state: RootState) => 
        state.menus.data.find((menu: IMenu) => menu.id === id)
      );     let [menu, setMenu] = React.useState<any>(menuFromRedux)
     React.useEffect(()=> {
          if(!menu) {
            if(typeof window !== 'undefined'){ 
                axios.get(`/api/menus/${id}`).then((res) => {  
                setMenu(res.data.data) 
                setValue("name",res.data.data.name)
                setValue("isActive",res.data.data.isActive)
                }).catch((err) => {
                console.log(err)
                })
            }
          }
     } , [])
 
     const { handleSubmit, control,setValue, register, formState: { errors } , getValues } = useForm<IMenu>({
        defaultValues: {
            name: menu?.name,
            isActive: menu?.isActive
        }
    })
    return <> <form className="flex flex-col gap-5 justify-center mt-5">
        <label className="mx-auto w-1/2">Nom menu :</label>
        <Input className="mx-auto w-1/2" {...register("name")}/>
        <div className="mx-auto w-1/2 gap-4"> 
        </div>
        </form>
        {menu?.products && <h1 className="text-2xl font-bold text-center my-2">Liste des produits ({menu?.products.length})</h1>}
        {menu?.products && menu.products.map((product: any) => {
            return  <> <FoodCard product={product} /> </>
        })}
         </>
}