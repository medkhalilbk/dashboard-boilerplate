import { IProduct } from '@/types/product';
import Image from 'next/image';
import React from 'react';
import { Button } from '../button';
import { EditIcon, TrashIcon } from 'lucide-react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '@/lib/features/productsSlice';

 
interface ProductCardProps {
    product: IProduct;
    showButtons?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showButtons = true }) => {
    const router  = useRouter()
    const dispatch = useDispatch()
    return (
        <div onClick={() => {

        }} className="flex flex-row mx-auto justify-between align-center w-full mx-4 my-4 block  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <Image style={{cursor:"pointer"}} onClick={() => { 
            }} className='rounded-full' src={product.mainImageUrl} alt={product.name} width={100} height={100} />
            <div className='w-1/3' >
            <h1 className="text-xl my-2 font-bold">{product.name}</h1>
            <p className="text-gray-500">{product.description}</p>
            </div>
            <div className="w-1/3 flex flex-row">
            <div className="w-1/2">
            <h1 className="text-xl my-2">{product.price} DT</h1>
            <p className={(product.inStock ? "text-green-500" : "text-red-500") + " my-2" }> {product.inStock? "Disponible" : "Rupture de stock"} </p>
            </div>
            <div className="w-1/2">
                {showButtons && <div className="flex flex-col gap-2 mx-auto justify-center">
                <Button onClick={() => {
                    router.push(`/company-dashboard/products/${product.id}/edit`)
                }} size={"icon"} className='bg-green-500'> <EditIcon/> </Button> 
                <Button onClick={() => {
                    Swal.fire({
                        title: 'Êtes-vous sûr?',
                        text: "Voulez vous vraiment supprimer ce produit?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Oui, supprimez-le!',
                        cancelButtonText:"Annuler"
                      }).then((result) => {
                        if (result.isConfirmed) {
                            axios.delete(`/api/products/${product.id}`).then((res) => {
                            dispatch(deleteProduct(product))
                            Swal.fire(
                            'Supprimé!',
                            'Le produit a été supprimé.',
                            'success'
                          )
                            })
                           
                        }
                    })
                }} size={"icon"} className='bg-red-500'> <TrashIcon/> </Button> 
            </div> }
            
            </div>
            </div>
         
        </div>
    );
};

export default ProductCard;