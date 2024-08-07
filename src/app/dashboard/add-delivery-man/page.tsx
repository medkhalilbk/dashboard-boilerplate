"use client"
import React from 'react';
import DeliveryManForm from '@/components/ui/forms/deliveryForm';
import { useState } from 'react';
import DashboardLayout from '@/components/dashboardUILayout';
import { Button } from '@/components/ui/button';
import { ArrowLeftCircle } from 'lucide-react';
const AddDeliverymanPage: React.FC = () => {
    const handleFormSubmit = (formData: any) => {
        // Handle form submission logic here
        console.log(formData);
    };
   const [dataFormIsSet, setDataFormIsSet] = useState(false)
    return (
   <DashboardLayout>
         <div>
         <div className="flex row justify-between">
        <Button variant={"destructive"} onClick={() => { 
        window.history.back();
    }}><ArrowLeftCircle/>  </Button>
            <Button variant={"ghost"} onClick={() => { 
      
    }}> {/* <PrinterIcon/>  */} </Button>
        </div>
            <DeliveryManForm onSubmit={setDataFormIsSet} />
        </div>
    </DashboardLayout>
    );
};

export default AddDeliverymanPage;