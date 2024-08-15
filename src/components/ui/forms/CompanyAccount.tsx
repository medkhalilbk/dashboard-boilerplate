import React from 'react';
import { Button } from '../button';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { generatePassword } from '@/lib/utils';
import axios from 'axios';

interface CompanyAccountProps {
    // Define the props for your component here
    company:any
}

const CompanyAccount: React.FC<CompanyAccountProps> = ({company}) => { 
    const [choice,setChoice] = React.useState<string>("")
    const [generatedPassword, setGeneratedPassword] = React.useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: {
             companyId:company.id,
             email: "",
             password:"",
        }
    });
    const onSubmit = (data: any) => {
        event?.preventDefault();
        console.log("Form data :", getValues());
        axios.post('/api/users' , {
            email: getValues("email"),
            password: getValues("password"),
            companyId: getValues("companyId"),
            name:company.name,
            role:"companyAdmin",
            isEmailVerified:true,
            imgUrl:company.mainImage
        }).then((res:any) => {
            console.log(res.data.data)
            Swal.fire({
                icon:"success",
                title:"Entreprise ajoutée avec succès"

            }).then((response) =>{
                if(response.isConfirmed){
                    window.location.replace('/dashboard/companies');
                }
            })
        }).catch((err) =>{

        })
    };
    return (
        <div>
              {!choice && (
                <div className='flex flex-col gap-4 my-4 w-1/2 mx-auto'>
                    <h1 className='text-3xl'>Que voulez vous faire?</h1>
                    <Button size={"lg"} onClick={() => setChoice('assign')}>Ajouter un utilisateur</Button>
                    <Button size={"lg"}  onClick={() => setChoice('select')}>Selectionner un utilisateur existant</Button>
                </div>
              )}
              {choice === 'assign' && (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Idendifiant de l&apos;entreprise:
                </label>
                <input
                    type="text"
                    disabled 
                    {...register("companyId", { required: true })}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
            </div>
        <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email:
                </label>
                <input
                    type="password"
                    id="email"
                    {...register("password", { required: true })}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Nouveau mot de passe:
                </label>
                <Button
                    disabled={generatedPassword}
                    className="my-2"
                    onClick={() => {
                        const newPassword = generatePassword();
                        Swal.fire({
                            title: "Nouveau mot de passe",
                            text: `Le nouveau mot de passe est : ${newPassword}`,
                            icon: 'info',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setValue("password", newPassword);
                                setGeneratedPassword(true);
                            }
                        });
                    }}
                >
                    Générer un nouveau mot de passe
                </Button>
                <Button disabled={
                    !getValues("email") || !getValues("password")
                } type="submit" size={"lg"} className="w-full" onClick={() => {}}>
                    Assigner
                </Button>
            </div>
        </form>
    </div>
)}

                {choice == 'select' && (
                    <div>
                        <h1>Selectionner un utilisateur existant</h1>
                    </div>)}
        </div>
    );
};

export default CompanyAccount;