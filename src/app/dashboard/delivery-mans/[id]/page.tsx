"use client"
import React from 'react'
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboardUILayout';
import axios from 'axios';
import { Spinner } from '@/components/ui/spinner';
import { ArrowLeftCircle, ViewIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

 

const DeliveryManPage: React.FC = () => {
    const {id} = useParams<{id:string}>();
    const [deliveryMan, setDeliveryMan] = React.useState<any>(null);
    React.useEffect(() => {
        axios.get(`http://localhost:3000/api/deliveryMans/${id}`).then((res) => {
        setDeliveryMan(res.data.data)
        console.log(res.data.data)
        })
    } , []);

    interface DeliveryManData {
        id: string;
        fullName: string;
        phoneNumber: string;
        socialStatus: string;
        ordersCompleted: number;
        vehiculeSerialNumber: string | null;
        cin: string;
        isActive: boolean;
        contractFile: string;
      }
      
const DeliveryManDataComponent : React.FC<{data:DeliveryManData, 
    imgUrl?:string,
    isDeleted?: boolean;
    email?:string;
    name?:string}> = ({data,imgUrl,email,isDeleted,name}) => {
    return <div  className="p-6 bg-white rounded-lg shadow-md"> 
        <div className="grid grid-cols-2">
            <div className="image-wrapper">
                <img src={imgUrl} className='m-auto rounded-full' width={200} alt="Image livreur"/> 
        <h2 className="text-xl font-bold mb-4 text-center my-2">{data.fullName || name}</h2>
        <h2 className="text-xl font-bold mb-4 text-center my-2">{email}</h2>
            </div>
            <div>
            <h1 className="text-4xl font-bold mb-4">Détail du livreur</h1>
        <h2 className="text-xl font-bold mb-4">Téléphone: {data.phoneNumber}</h2>
        <h2 className="text-xl font-bold mb-4">Statut Social: {data.socialStatus}</h2>
        <h2 className="text-xl font-bold mb-4">CIN: {data.cin}</h2>
        <h2 className="text-xl font-bold mb-4">Nombre de livraisons: {data.ordersCompleted}</h2>
        <h2 className="text-xl font-bold mb-4">Série de véhicule: {data.vehiculeSerialNumber || "Non attribué"}</h2>
        <h2 className="text-xl font-bold mb-4">
  Statut de compte Tiktak :{" "}
  <span className={data.isActive ? "text-green-500" : "text-red-400"}>
    {data.isActive ? "Activé" : "Désactivé"}
  </span>
</h2>
        <h2 className="text-xl font-bold mb-4">Contrat:  <Button onClick={() => {
        window.open(data.contractFile)
        }}><ViewIcon/></Button></h2>
            </div>
        </div>
    </div>
}


    return (
    <DashboardLayout>
            <div> 
            <Button variant={"destructive"} onClick={() => { 
        window.history.back();
    }}><ArrowLeftCircle/>  </Button>
                {!deliveryMan && <Spinner size={"large"} />}
                {deliveryMan && <div> 
                    <DeliveryManDataComponent name={deliveryMan.userData.name} email={deliveryMan.userData.email} imgUrl={deliveryMan.userData.imgUrl} data={deliveryMan.deliveryManData} />
                    </div>}
        </div>
    </DashboardLayout>
    );
};

export default DeliveryManPage;