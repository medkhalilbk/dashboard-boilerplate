import { IProduct } from "@/types/product";
import { Switch } from "../switch";
import Swal from "sweetalert2"; 
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateMenu } from "@/lib/features/MenuSlice";
import { IMenu } from "@/types/menu";
import axios from "axios";

const FoodCard = ({product,menu,setMenu} : {product:IProduct, menu:IMenu,setMenu:any}) => {
    let dispatch = useDispatch()
    
    const router = useRouter();
    return (
      <div className="w-full flex flex-col md:flex-row rounded-sm shadow-xl bg-white overflow-hidden">
      <img src={product?.mainImageUrl} className="mx-auto h-[200px] rounded-full" />
      <div className="p-4 sm:p-6 w-full md:w-1/2 flex flex-col justify-around">
        <div>
          <p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
            {product.name}
          </p>
          <div className="flex flex-row">
            <p className="text-[17px] font-bold text-[#0FB478]">
              {product.price} DT
            </p>
          </div>
          <p className="text-[#7C7C80] font-[15px] mt-6">
            {product.description}
          </p>
          <p
            className={
              (product.inStock ? "text-green-500" : "text-red-500") + " my-2"
            }
          >
            {product.inStock ? "En stock" : "En rupture de stock"}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <button
            onClick={() => {
              router.push(`/company-dashboard/products/${product.id}/edit`);
            }}
            className="w-full md:w-auto px-4 py-3 font-medium tracking-wide text-center text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-[14px] hover:bg-green-300 hover:text-black focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
          >
            Modifier le produit
          </button>
          <button
            onClick={() => {
              Swal.fire({
                title: "Êtes-vous sûr?",
                text: "Voulez vous vraiment supprimer ce produit de menu?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Oui, supprimez-le!",
                cancelButtonText: "Annuler",
              }).then((result) => {
                if (result.isConfirmed && menu){ 
                  let updatedMenu : any = {...menu} 
                  updatedMenu.products = updatedMenu?.products?.filter((p:any) => p.id !== product.id)
                  axios.patch("/api/menus/"+menu.id,{...updatedMenu,products:updatedMenu.products.map((p:any) => p.id)}).then((res) => {
                    if(res.status == 200) {
                  setMenu(updatedMenu) 
                  dispatch(updateMenu(updatedMenu))
                  Swal.fire("Supprimé!", "Le produit a été supprimé.", "success");
                    }
                  })
                }
              });
            }}
            className="w-full md:w-auto px-4 py-3 font-medium bg-red-500 tracking-wide text-center text-white capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-red-300 hover:text-gray focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
          >
            Retirer le produit
          </button>
        </div>
      </div>
    </div>
    
    );
  };
  
  export default FoodCard;