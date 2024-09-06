"use client";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FoodCard from "@/components/ui/product/MenuProductCard";
import ProductCard from "@/components/ui/product/productCard";
import { Switch } from "@/components/ui/switch";
import { addMenu, setMenus, updateMenu } from "@/lib/features/MenuSlice";
import { RootState } from "@/lib/store";
import { IMenu } from "@/types/menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function EditMenuPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let menuFromRedux = useSelector((state: RootState) =>
    state.menus.data.find((menu: IMenu) => menu.id === id)
  );
  let [menu, setMenu] = React.useState<any>(menuFromRedux);
  let [products, setProducts] = React.useState<any>([]);
  let [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  React.useEffect(() => {
    if (!menu) {
      if (typeof window !== "undefined") {
        axios
          .get(`/api/menus/${id}`)
          .then((res) => {
            setMenu(res.data.data);
            dispatch(addMenu(res.data.data));
            setValue("name", res.data.data.name);
            setValue("isActive", res.data.data.isActive);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } 
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      let companyId = localStorage.getItem("id");
      axios
        .get(`/api/companies/${companyId}/products`)
        .then((res) => {
          setProducts(res.data.data);
          console.log(res.data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
    getValues,
  } = useForm<IMenu>({
    defaultValues: {
      name: menu?.name,
      isActive: menu?.isActive,
    },
  });
  return (
    <>

      <form className="flex flex-col gap-5 justify-center mt-5">
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
                  <Select onValueChange={(value:string) => {
                      let product = products?.find((product:any) => product.id === value ) 
                      setSelectedProduct(product)
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
                  </Select>{" "}
                </AlertDialogDescription>
                {selectedProduct && <ProductCard showButtons={false} product={selectedProduct} />}
              </AlertDialogHeader>
              <AlertDialogFooter className="mx-auto">
                <AlertDialogCancel onClick={() => {
                  setSelectedProduct(null)
                }}>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  let newMenu = {...menu,products:[...menu.products,selectedProduct]} 
                  axios.patch(`/api/menus/${menu.id}`,{products:newMenu.products.map((product:any) => product.id) }).then((res) => {
                    console.log(res)
                    setMenu(newMenu)
                    dispatch(updateMenu(newMenu))
                    setSelectedProduct(null)
                  })

                }}>Ajouter</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="mx-auto w-1/2 gap-4"></div>
      </form>
      {menu?.products && (
        <h1 className="text-2xl font-bold text-center my-2">
          Liste des produits ({menu?.products.length})
        </h1>
      )}
      <div className="flex flex-wrap space-x-4 justify-center">
        {menu?.products &&
          menu.products.map((product: any) => (
            <FoodCard
              setMenu={setMenu}
              menu={menu}
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </>
  );
}
