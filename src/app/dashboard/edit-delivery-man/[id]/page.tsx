"use client"
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboardUILayout';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ArrowLeftCircle } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2';
import { generatePassword } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
interface Props {
    id: string;
} 
const Page: React.FC<Props> = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = React.useState<any>(null);
    const [step, setStep] = React.useState<number>(1);
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
                setValue('isActive', data.isActive)
                setValue("vehiculeSerialNumber",data.vehiculeSerialNumber); }
        }, [data])
        const onSubmit = async () => {
            event?.preventDefault()
           let form = getValues()
            try { 
                let response  = await axios.patch("/api/deliveryMans/"+data.id, form)
                 try {
                    if(response.status == 200){
                        Swal.fire({
                            title:"Informations sont à jours",
                            icon:"success"
                        })
                    }
                 } catch (error) {
                    
                 }
            } catch (error) {
                console.log(error);
            }
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
                type="number"
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
            <label htmlFor="cin" className="block text-sm font-medium text-gray-700">
                Série de la véhicule:
            </label>
            <input
                type="text"
                id="cin" 
                {...register("vehiculeSerialNumber", { required:false })}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
            />
           </div>
        <div className="mb-4 flex flex-col justify-center gap-2 mx-auto">
        <Button className='bg-green-500' type="submit">
                Mettre à jour
            </Button>
        </div>
    </form>
       </div>)
    }
    const DeliveryManTikTakForm: React.FC<{ data: any, isActive: boolean, userId:string }> = ({ data, isActive, userId }) => {
        const [generatedPassword, setGeneratedPassword] = useState(false);
        const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
            defaultValues: {
                tikTakAccount: {
                    email: data?.email || "",
                    password: data?.password || "",
                }
            }
        });
    
        React.useEffect(() => {
            if (data) {
                setValue('tikTakAccount.email', data.email);
                setValue('tikTakAccount.password', data.password);
            }
        }, [data, isActive, setValue]);
    
        const onSubmit = (data: any) => {
            event?.preventDefault();
            console.log("Form data TiktakAccount:", getValues());
        };
    
        return (
            <>
                <h1 className='text-2xl text-center'> Informations de connexion</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email :
                        </label>
                        <input
                            type="text"
                            id="email"
                            {...register("tikTakAccount.email", { required: true })}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Nouveau Password :
                        </label>
                        <Button disabled={generatedPassword} className='my-2' onClick={() => {
                            const newPassword = generatePassword();
                            Swal.fire({
                                title: "Nouveau mot de passe",
                                text: `Le nouveau mot de passe est : ${newPassword}`,
                                icon: 'info',
                                confirmButtonText: 'Ok'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    setValue("tikTakAccount.password", newPassword);
                                    setGeneratedPassword(true);
                                }
                            });
                        }}>
                            Génerer un nouveau mot de passe
                        </Button>
                    </div>
{/*                     <div className="mb-4 flex flex-row">
                        <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">
                            Actif :
                        </label>
                        <Checkbox className='ml-2'
                            defaultChecked={isActive}
                            {...register("tikTakAccount.isActive")}
                        />
                    </div> */}
                    <Button onClick={() => {
                        axios.patch("/api/users/"+userId , getValues().tikTakAccount).then((res) => {
                            Swal.fire({
                                title: "Succès",
                                text: "Les informations ont été mises à jour",
                                icon: 'success',
                                confirmButtonText: 'Ok'
                            }).then((res) => { 
                                if(res.isConfirmed){
                                     
                                }
                            }); 
                        }).catch((err) => {
                            Swal.fire({
                                title: "Erreur",
                                text: "Une erreur s'est produite",
                                icon: 'error',
                                confirmButtonText: 'Ok'
                            });
                        })
                    }} className='bg-green-500 w-full' type="submit">
                        Mettre à jour
                    </Button>
                </form>
            </>
        );
    };    
    const DeliveryManContractForm: React.FC<{ data: any }> = ({ data }) => {
        const { register, handleSubmit } = useForm();
    
        const onSubmit = async (formData: any) => {
            let id = data.id;
            
            const file = formData.contract[0]; // Access the file from the formData object
            // Handle the file here, e.g., send it to a server
           let form = new FormData();
              form.append("file", file);
              try {
                let response = await fetch("/api/upload" , {
                    method:"POST",
                    body:form
                })
                let data = await response.json();
                let updateContract = await axios.patch("/api/deliveryMans/"+id, {contractFile:data.URL})
                console.log(updateContract.data.data);
                if(response.ok){
                    Swal.fire({
                        title:"Contrat mis à jour",
                        icon:"success"
                    })
                }
              } catch (error) {
                console.log(error)
                Swal.fire({
                    title:"Erreur",
                    icon:"error"
                })
              }
        };
    
        return (
            <div>
                <h1 className="text-2xl text-center">Sélectionner un contrat</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"
                >
                    <div className="mb-4">
                        <label htmlFor="contract" className="block text-sm font-medium text-gray-700">
                            Contrat :
                        </label>
                        <input
                            type="file"
                            accept=".pdf"
                            id="contract"
                            {...register("contract", { required: true })}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                        />
                    </div>
                    <button className="bg-green-500 flex justify-center p-2 text-white rounded-md" type="submit">
                        Mettre à jour
                    </button>
                </form>
            </div>
        );
    };
      
    
    return (
<DashboardLayout>
        <div> 
        <Button variant={"destructive"} onClick={() => { 
        window.history.back();
    }}><ArrowLeftCircle/>  </Button>
            {!data && <Spinner size={"large"} />}
            {data && <div> 
                <div className="flex flex-row justify-center gap-8 my-5 mx-auto w-full">
                <Button className='bg-blue-500' onClick={() =>{
                    setStep(1)
                }} disabled={step == 1}>
               Modifier les informations
            </Button>
                <Button className='bg-green-500' disabled={step == 2} onClick={() => {
                    setStep(2)
                }} >
               Modifier le compte TikTak
            </Button>
            <Button className='bg-orange-500'onClick={() => {
                setStep(3)
            }} disabled={step == 3}>
               Mettre à jour le contrat
            </Button>
            <Button className='bg-yellow-500' type="submit">
                Modifier l'image
            </Button>
                </div>
                {step === 1 && <DeliveryManForm data={data.deliveryManData} />}
                {step === 2 && <DeliveryManTikTakForm userId={data.userData.id} isActive={data.deliveryManData.isActive} data={data.userData} />}
                {step === 3 && <DeliveryManContractForm data={data.deliveryManData}/>}
              </div>}
        </div>
</DashboardLayout>
    );
};

export default Page;