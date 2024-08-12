"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboardUILayout';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ArrowLeftCircle } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Button } from "@/components/ui/button";
interface Props {
    id: string;
} 
const Page: React.FC<Props> = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = React.useState<any>(null);
    React.useEffect(() => {
     axios.get('/api/deliveryMans/'+id).then((res) => {
        console.log(res.data.data);
        setData(res.data.data); 
     }) 
    } , [])
    const DeliveryManForm:React.FC<{data:any}> = ({data}) => {
        const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
            defaultValues: {
                fullName: "",
                phoneNumber: "",
                socialStatus: "",
                vehiculeSerialNumber: "",
                cin: "",
                isActive: true,

            }
        })
        React.useEffect(() => { 
            if (data) {
                setValue('fullName', data.fullName);
                setValue('phoneNumber', data.phoneNumber);
                setValue('socialStatus', data.socialStatus);
                setValue('cin', data.cin);
                setValue('isActive', data.isActive); }
        }, [data])
        const onSubmit = (data:any) => {
            event?.preventDefault()
            console.log("Form data submitted:", getValues);
            // Add your form submission logic here
          };

       return ( <div>
        <h1 className='text-2xl text-center'> Informations compte livreur</h1>
         <form onSubmit={onSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
        <div className="mb-4">
            
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom complet:
            </label>
            <input
                type="text"
                id="name" 
                {...register('fullName', { required: true })}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Telephone:
            </label>
            <input
                type="email"
                {...register('phoneNumber', { required: true })}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
            /> 
        </div>  
        <div className="mb-4">
            <label htmlFor="socialStatus" className="block text-sm font-medium text-gray-700">
                Statut social:
            </label>
            <input
                type="text"
                id="socialStatus" 
                {...register('socialStatus', { required: true })} 
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
            />
           </div>
        <div className="mb-4">
            <label htmlFor="cin" className="block text-sm font-medium text-gray-700">
                CIN:
            </label>
            <input
                type="text"
                id="cin" 
                {...register('cin', { required: true, pattern: /^[0-9]{8}$/ })}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
            />
           </div>
        <div className="mb-4">
            <label htmlFor="isActive" className="flex items-center">
                <input
                    type="checkbox"
                    id="isActive" 
                    {...register('isActive')}
                    className="h-4 w-4 text-indigo-600 focus:ring-black border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Actif</span>
            </label>
        </div>
        <div className="mb-4 flex flex-col justify-center gap-2 mx-auto">
        <Button className='bg-green-500' type="submit">
                Mettre à jour
            </Button>
        </div>
    </form>
       </div>)
    }
    return (
<DashboardLayout>
        <div> 
        <button onClick={() => { 
    window.history.back();
}}><ArrowLeftCircle/>  </button>
            {!data && <Spinner size={"large"} />}
            {data && <div> 
                <div className="flex flex-row justify-center gap-8 my-5 mx-auto w-full">
                <Button className='bg-blue-500' type="submit">
               Modifier le mot de passe
            </Button>
            <Button className='bg-orange-500' type="submit">
               Mettre à jour le contrat
            </Button>
            <Button className='bg-yellow-500' type="submit">
                Modifier l'image
            </Button>
                </div>
                <DeliveryManForm data={data.deliveryManData} />
              </div>}
        </div>
</DashboardLayout>
    );
};

export default Page;