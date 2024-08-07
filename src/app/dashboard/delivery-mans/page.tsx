"use client"
import DashboardLayout from '@/components/dashboardUILayout'; 
import DeliverymanCard from '@/components/ui/deliveryMan/DeliveryManCard';
import DeliveryManForm from '@/components/ui/forms/deliveryForm';
import { setDeliveryMen } from '@/lib/features/deliveryManSlice';
import { IDeliveryMan } from '@/types/DeliveryMan';
import axios from 'axios';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DeliveryMansPage: React.FC = () => {
   const deliveryMansState = useSelector((state :any) => state.deliveryMan.data as IDeliveryMan[])
   const dispatch = useDispatch()
   const router = useRouter()

    React.useEffect(() => {
        async function fetchData() {
          try {
            let {data} = await axios.get('/api/deliveryMans') 
            return data
          } catch (error) {
            console.error("error fetching deliveryman data" , error)
          }
        }
        fetchData().then((resnpose :any) => {
        dispatch(setDeliveryMen(resnpose.data.deliveryMans))
        })
    } , [])


    const [dataFormIsSet, setDataFormIsSet] = useState(false)
    return (
    <DashboardLayout>  
         <div className='flex flex-col w-3/2 py-4'>
        <div className="flex flex-row justify-between items-center my-4">
          <h1 className="scroll-m-20 text-3xl mr-5 font-extrabold tracking-tight lg:text-3xl">Livreurs 🛵</h1>
          <button 
            onClick={() => {router.push('/dashboard/add-delivery-man')}} 
            className="flex-shrink-0 bg-green-200 text-gray-700 duration-75 border-gray-300 border rounded-md py-4 px-4 flex items-center justify-center text-sm font-medium hover:bg-green-100 focus:outline-none"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Ajouter 
          </button>
          </div>
          </div>
          {deliveryMansState.map((d:IDeliveryMan) => {
            return <DeliverymanCard deliveryman={d} />
          })}
         {/* <DeliveryManForm onSubmit={setDataFormIsSet} /> */}
    </DashboardLayout>
    );
};

export default DeliveryMansPage;