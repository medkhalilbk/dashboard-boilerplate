"use client"
import DashboardLayout from '@/components/dashboardUILayout'; 
import DeliveryManForm from '@/components/ui/forms/deliveryForm';
import React, { useState } from 'react';

const DeliveryMansPage: React.FC = () => {
    const [dataFormIsSet, setDataFormIsSet] = useState(false)
    return (
    <DashboardLayout>  
         <div className='flex flex-col w-3/2 py-4'>
        <div className="flex flex-row justify-between items-center my-4">
          <h1 className="scroll-m-20 text-3xl mr-5 font-extrabold tracking-tight lg:text-3xl">Livreurs 🛵</h1>
          </div>
          </div>
         {/* <DeliveryManForm onSubmit={setDataFormIsSet} /> */}
    </DashboardLayout>
    );
};

export default DeliveryMansPage;