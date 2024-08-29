"use client"
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import React from 'react';
import axios from 'axios';
import { CompactTable } from '@table-library/react-table-library/compact';
import DataTablesOrders from '@/components/ui/orders/DataTables';
import { IOrderDetails } from '@/components/ui/orders/cartResultTypes';

export default function OrdersPage() { 

let [orders,setOrders] = React.useState<IOrderDetails[] | []>([])
  
React.useEffect(() => {
  if(typeof window !== 'undefined'){
    let id = localStorage.getItem('id')
    axios.get(`/api/companies/${id}/orders`).then((res)=>{
      setOrders(res.data?.data)
    })
  }
} , [])  

return (
   <>
   <div className='my-3 mx-2'>
   <DataTablesOrders orders={orders} />
   </div>
   </>
);
}