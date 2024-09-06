"use client"
import { Input } from "@/components/ui/input"
import { AlertDialog,AlertDialogTrigger,AlertDialogContent,AlertDialogHeader,AlertDialogCancel,AlertDialogFooter,AlertDialogAction,AlertDialogTitle,AlertDialogDescription } from "@/components/ui/alert-dialog"
import { Select, SelectTrigger,SelectValue,SelectContent,SelectItem } from "@/components/ui/select"
import { useForm } from "react-hook-form";
import { IMenu } from "@/types/menu";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import axios from "axios";
import ProductCard from "@/components/ui/product/productCard";
import { addMenu } from "@/lib/features/MenuSlice";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
export default function AddMenu(){
    let productsFromRedux = useSelector((state: RootState) => state.products.data);
    let [products, setProducts] = React.useState(productsFromRedux)
    let [selectedProduct, setSelectedProduct] = React.useState<any>()
    let [menu, setMenu] = React.useState<any>()
    let user = useSelector((state: RootState) => state.user)
    let [id, setId] = React.useState("")
    let dispatch = useDispatch()
    const router = useRouter()
    React.useEffect(() => {

        if(products.length == 0){
            if(typeof window !== "undefined"){
                let id = localStorage.getItem("id") as string
                setId(id)
                axios.get("/api/companies/"+id+"/products").then((res:any) => {
                    if(res.data.data.length !== 0){
                        setProducts(res.data.data)
                    }
                }).catch((err:any) => {
                    console.log(err)
                })
            }
        }
    }  , [])
    const {
        handleSubmit,
        control,
        setValue,
        register,
        formState: { errors },
        getValues,
      } = useForm<IMenu>({
        defaultValues: {
          name: "",
          isActive: true,
        },
      });
    return (
        <form className="flex flex-col  justify-center mt-5">
        <label className="mx-auto w-1/2">Nom menu :</label>
        <div className="flex flex-row mx-auto items-center w-1/2 gap-3">
          <Input className="mx-auto" {...register("name")} />
          <AlertDialog>
            <AlertDialogTrigger>
            <div  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Ajouter un produit </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-1/3">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center">
                  Choisir un produit
                </AlertDialogTitle>
                <AlertDialogDescription>
                 {products.length !== 0 &&  <Select onValueChange={(value:string) => {
                     if(!value) return
                     let product = products?.find((product:any) => product.id === value ) 
                     if(product !== null){
                       setSelectedProduct(product)
                     }
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choisir un produits" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.length > 0 && products?.map((product: any) => (
                        <SelectItem  key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>} 
                </AlertDialogDescription>
                {selectedProduct && <ProductCard showButtons={false} product={selectedProduct} />}
              </AlertDialogHeader>
              <AlertDialogFooter className="mx-auto">
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  console.log(user)
                    if(getValues("name") === "" && getValues("name").length < 4){
                        Swal.fire({
                            title:"Le nom de menu doit contenir au moins 4 caractères",
                            icon:"error",
                            confirmButtonColor:"#E12E49"
                        })
                        return
                    }
                    let menuData = {...getValues()}
                    menuData.companyId = id
                    menuData.products = selectedProduct? [selectedProduct.id] : [] 
                    let menuState = {...menuData}
                    menuState.products = selectedProduct? [selectedProduct] : []  
                    axios.post(`/api/menus`,menuData).then((res) => {
                    menuState.id = res.data.data.id
                    setMenu(menuState)
                    dispatch(addMenu(menuState))
                    setSelectedProduct(null)
                    Swal.fire({
                        title:"Menu ajouté",
                        icon:"success"
                    }).then((res) =>{
                        if(res.isConfirmed){
                            router.push("/company-dashboard/menus")
                        }
                    })
                  }).catch((err:any) => {
                    console.log(err)
                  })

                }}>Ajouter</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="mx-auto w-1/2 gap-4"></div>
      </form>
    )
}