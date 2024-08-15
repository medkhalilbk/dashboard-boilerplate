import { IMenu } from "@/types/menu";
import { Badge } from "../badge";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger, 
  } from "@/components/ui/collapsible"
import ProductCard from "../product/productCard";
import { Button } from "../button";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { updateMenu } from "@/lib/features/MenuSlice";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
  
const MenuCard = ({menu} : {menu:IMenu}) => {
    const [isCollapse, setIsCollapse] = React.useState(true)
    const dispatch = useDispatch()
    const router = useRouter()
    const CollapseIcon = () => {
        return isCollapse ? <ChevronDown/> : <ChevronUp/>
    } 
    return (
        <div className="flex flex-row justify-center mt-8 w-full">
            <div className="flex flex-row w-full">
            <div className="bg-white rounded-lg shadow-lg p-4 m-4 w-4/6 mx-auto">
                <div className="flex justify-between">
                <Collapsible className="w-full mx-5">
  <CollapsibleTrigger> <div className="flex flex-row" onClick={() => {
    setIsCollapse(!isCollapse)
  }}> <h1 className="text-lg font-bold gap-4">{menu.name}</h1> <CollapseIcon/></div></CollapsibleTrigger>
  <CollapsibleContent>
  <div className="flex flex-col mt-2 w-full">
                {menu.products && menu.products.map((product,k) => {
                    return <ProductCard key={k} product={product} />
                })}
                </div>
  </CollapsibleContent>

</Collapsible>
               
               <div className="flex flex-col gap-2">
               <Badge variant={"outline"} className="mx-auto">
                <h1 className={menu.isActive ? "text-sm font-bold text-green-600 text-center" : "text-sm font-bold text-red-600 text-center"}>{menu.isActive ? "Active" : "Inactive"}</h1>
                </Badge>
                <AlertDialog>
                  <AlertDialogTrigger>
                  <Button>Modifier le menu</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent >
                    <AlertDialogHeader>
                      <AlertDialogTitle >Modifier le menu : {menu.name}</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription dir="row" >
                      <div className="flex flex-col mx-auto gap-2 w-3/2">
  <Button className="bg-green-500" onClick={() => {
                        router.push('/company-dashboard/menus/'+menu.id)
                      }}>Modifier les informations du menu</Button> 
  <Button className="bg-blue-500">Modifier les produits</Button> 
  <Button className="bg-orange-500" onClick={()=>{
    axios.patch(`/api/menus/${menu.id}`,{isActive:!menu.isActive}).then((res) => {
      console.log(res) 
    dispatch(updateMenu({...menu,isActive:!menu.isActive}))
   
    })
  }} >{menu.isActive? "Désactiver" : "Activer"} temporairement</Button> </div>
</AlertDialogDescription>
<AlertDialogFooter>
          <AlertDialogCancel style={{margin:0,padding:0}}> <Button variant={"destructive"}>Fermer</Button> </AlertDialogCancel> 
        </AlertDialogFooter>
                 </AlertDialogContent>
      
                </AlertDialog>
                <Button variant={"destructive"} ><Trash2/></Button>
               </div>
                
                </div>
           
            </div>
            </div>
        </div>
    );
  }


  export default MenuCard