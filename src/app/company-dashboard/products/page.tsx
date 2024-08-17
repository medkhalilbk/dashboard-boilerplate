"use client"
import { Spinner } from '@/components/ui/spinner';
import { setProducts } from '@/lib/features/productsSlice';
import { RootState } from '@/lib/store';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function productsPage () {
    const dispatch = useDispatch()
    const products = useSelector((state:RootState) => state.products)
    React.useEffect(() => {
        if(typeof window !== "undefined") {
            let id = window.localStorage.getItem("id")   
            axios.get("/api/companies/"+id+"/products").then((res) => {
                if(res.data.data){
                    dispatch(setProducts(res.data.data))
                }
            })
        }
    }, [])
    return (
        <div>
            <h1>Liste des produits</h1> 
            {products.data.length == 0 ? <Spinner size={"large"} />  : JSON.stringify(products)}
        </div>
    );
};

 