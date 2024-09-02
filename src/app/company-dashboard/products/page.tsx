"use client"
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ui/product/productCard';
import SearchInput from '@/components/ui/searchBar';
import { Spinner } from '@/components/ui/spinner';
import { setProducts } from '@/lib/features/productsSlice';
import { RootState } from '@/lib/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductsPage () {
    const dispatch = useDispatch()
    const products = useSelector((state:RootState) => state.products)
    const [search, setSearch] = React.useState("")
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    React.useEffect(() => {
        if(typeof window !== "undefined") {
            let id = window.localStorage.getItem("id")   
            axios.get("/api/companies/"+id+"/products").then((res) => {
                if(res.data.data){
                    dispatch(setProducts(res.data.data))
                    setIsLoading(false)
                }
            })
        }
    }, [])
    return (
        <div>
            <h1 className='text-2xl font-bold text-center my-8'>Liste des produits</h1> 
            <div className="mx-auto flex justify-center items-center gap-16 mb-4"> <SearchInput onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value)
            }} /> <Button size={"lg"} onClick={() => {
                router.push("/company-dashboard/products/add")
            }} className='bg-green-500'>Ajouter un produit</Button> </div>
            {products.data.length == 0 && isLoading && <Spinner size={"large"} /> }
            {(products.data.length > 0 && search == "") && products.data.map((product) => {
                return <><ProductCard product={product}/></>
            })}
            {(products.data.length > 0 && search != "") && products.data.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())).map((product) => {
                return <><ProductCard product={product}/></>
            })}
        </div>
    );
};

 