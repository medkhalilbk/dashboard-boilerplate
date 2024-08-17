import { IProduct } from "@/types/product";
import { Switch } from "../switch";
import Swal from "sweetalert2"; 
import { useRouter } from "next/navigation";

const FoodCard = ({product} : {product:IProduct}) => {
    const router = useRouter();
    return (
        <div className='max-w-md mx-auto rounded-sm shadow-xl bg-white overflow-hidden'>
        <div
          className='h-[236px]'
          style={{
            backgroundImage: `url(${product?.mainImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className='p-4 sm:p-6'>
          <p className='font-bold text-gray-700 text-[22px] leading-7 mb-1'>{product.name}</p>
          <div className='flex flex-row'> 
            <p className='text-[17px] font-bold text-[#0FB478]'>{product.price} DT</p>
          </div>
          <p className='text-[#7C7C80] font-[15px] mt-6'>
            {product.description}
          </p>
          <p className={(product.inStock ? "text-green-500" : "text-color-500") + " my-2" }>
            {product.inStock ? "En stock" : "En rupture de stock"}
          </p> 
          
          <button 
          onClick={() => {
            router.push(`/company-dashboard/products/${product.id}/edit`)
          }}
            className='block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-[14px] hover:bg-green-300 hover:text-black focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80'
          >
            Modifier le produit
          </button>
          <button
            onClick={() => {
                Swal.fire({
                    title: 'Êtes-vous sûr?',
                    text: "Voulez vous vraiment supprimer ce produit de menu?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, supprimez-le!',
                    cancelButtonText:"Annuler"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire(
                        'Supprimé!',
                        'Le produit a été supprimé.',
                        'success'
                      )
                    }
                })
            }}
            className='block mt-1.5 w-full px-4 py-3 font-medium bg-red-500 tracking-wide text-center text-white capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-red-300 hover:text-gray focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80'
          >
            Retirer le produit
          </button>
        </div>
      </div>
    );
  };
  
  export default FoodCard;