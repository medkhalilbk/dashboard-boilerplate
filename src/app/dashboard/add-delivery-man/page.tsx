"use client"
import React from 'react';
import DeliveryManForm from '@/components/ui/forms/deliveryForm';
import { useState } from 'react';
import DashboardLayout from '@/components/dashboardUILayout';
import { Button } from '@/components/ui/button';
import { ArrowLeftCircle } from 'lucide-react';
import Swal from 'sweetalert2'  
import DeliveryFormFiles from '@/components/ui/forms/delvieryFormFiles';
const AddDeliverymanPage: React.FC = () => {
    const handleFormSubmit = (formData: any) => { 
        console.log(formData);
    };
   const [userInfos, setUserInfos] = useState<any>(null)
   React.useEffect(() => {
    console.log(userInfos)
    if (userInfos) {
      Swal.fire({
        title: "<strong>Les informations de livreur</strong>",
        icon: "info",
        html: `
          <p><strong>Nom:</strong> ${userInfos.user.name}</p>
          <p><strong>Email:</strong> ${userInfos.user.email}</p> 
          <p><strong>Numéro de téléphone:</strong> ${userInfos.deliveryMan.phoneNumber}</p>
          <p><strong>Statut social:</strong> ${userInfos.deliveryMan.socialStatus}</p>
          <p><strong>CIN:</strong> ${userInfos.deliveryMan.cin}</p>
          <p><strong>Est actif:</strong> ${userInfos.deliveryMan.isActive ? 'Oui' : 'Non'}</p>
        `,
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonText: `Continuer!`,
        confirmButtonColor:"#079438"
      });
    }
  }, [userInfos]);
  
    return (
   <DashboardLayout>
         <div>
         <div className="flex row justify-between">
        <Button variant={"destructive"} onClick={() => { 
        window.history.back();
    }}><ArrowLeftCircle/>  </Button>
            <Button variant={"ghost"} onClick={() => { 
      
    }}> </Button>
        </div>
        {!userInfos? <DeliveryManForm onSubmit={setUserInfos} /> : <DeliveryFormFiles userId={userInfos.user.id} deliveryManId={userInfos.deliveryMan.id}/>}
        </div>
    </DashboardLayout>
    );
};

export default AddDeliverymanPage;