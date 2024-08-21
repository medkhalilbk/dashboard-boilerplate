"use client"
import DashboardLayout from '@/components/dashboardUILayout'; 
import { Button } from '@/components/ui/button';
import DeliverymanCard from '@/components/ui/deliveryMan/DeliveryManCard';
import DeliveryManForm from '@/components/ui/forms/deliveryForm';
import SearchInput from '@/components/ui/searchBar';
import { Spinner } from '@/components/ui/spinner';
import { setDeliveryMen } from '@/lib/features/deliveryManSlice';
import { IDeliveryMan } from '@/types/DeliveryMan';
import axios, { Axios } from 'axios';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DeliveryMansPage: React.FC = () => {
   const deliveryMansState = useSelector((state :any) => state.deliveryMan.data as IDeliveryMan[])
   const dispatch = useDispatch()
   const router = useRouter()
   const [serverError, setServerError] = useState("")
   const [search, setSearch] = useState('')
   const [filtredResult, setFiltredResult] = useState<any>([])
    React.useEffect(() => {
        async function fetchData() {
          try {
            let {data} = await axios.get('/api/deliveryMans') 
            return data
          } catch (error:any) {
           throw error
          }
        }
        fetchData().then((resnpose :any) => {
        dispatch(setDeliveryMen(resnpose.data.deliveryMans))
        }).catch((error:any) => {
          return  setServerError(error.response.data.message)
        })
    } , []) 
    React.useEffect(() => {
      if(search.length > 0){
        let result = deliveryMansState.filter((d:IDeliveryMan) => d.fullName.toLowerCase().includes(search.toLowerCase()))
        setFiltredResult(result)
      } }, [search])
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
          <SearchInput onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value)
          }} />
          </div>
          {serverError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{serverError}</span> 
</div>}
          {deliveryMansState.length == 0 && filtredResult.length > 0 && !serverError && <Spinner size="large" />}
          {search == "" && deliveryMansState.map((d:IDeliveryMan,k) => { 
            return <DeliverymanCard key={k} deliveryman={d} /> 
          })}
          {filtredResult.length > 0 && search.length > 0 && filtredResult.map((d:IDeliveryMan,k) => {
            return <DeliverymanCard key={k} deliveryman={d} />
          } )}
    </DashboardLayout>
    );
};

export default DeliveryMansPage;