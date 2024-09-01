import React from 'react';
import { Button } from '../button';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { generatePassword } from '@/lib/utils';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { getAllUsersService } from '@/app/api/users/services';
import { Iuser } from '@/lib/features/userSlice';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from '../command';
import { CommandItem } from 'cmdk';

interface CompanyAccountProps {
    // Define the props for your component here
    company:any
}

const CompanyAccount: React.FC<CompanyAccountProps> = ({company}) => { 
    const [choice,setChoice] = React.useState<string>("")
    const [users,setUsers] = React.useState([])
    const usersFromRedux = useSelector((state:RootState) => state.clients.data)
    const [generatedPassword, setGeneratedPassword] = React.useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        defaultValues: {
             companyId:company.id,
             email: "",
             password:"",
        }
    });
    React.useEffect(() => {
        
           axios.get("/api/unsigned-users").then((res) => {
             setUsers(res.data.data.users)  
           }) 
    } , [])

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
                    Mot de passe:
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
                            confirmButtonText: 'Ok' ,
                        }) 

                        setValue("password", newPassword);
                        setGeneratedPassword(true);
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
                        <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Selectionner un compte" />
      <CommandList>
        <CommandEmpty>Aucun résultat.</CommandEmpty>
        <CommandGroup heading="Utilisateurs existans">
           
         {users.length > 0 && users.map((u:any) => {
                return <CommandItem className='px-2 text-sm my-2'><Button  onClick={() => {
                    Swal.fire({
                        title:"Confirmation",
                        text:"Vous voulez vraiment assigner l'entreprise à " + u.email,
                        icon:"info",
                        confirmButtonText:"Oui",
                        confirmButtonColor:"#4caf50",
                        cancelButtonColor:"#d33",
                        cancelButtonText:"Non",
                        showCancelButton:true,
                    }).then((res) => {
                        if(res.isConfirmed){
                        return    axios.patch('/api/users/'+u.id , {
                                email: u.email,
                                companyId: company.id,
                            role:"companyAdmin"}).then((res) => {
                                    Swal.fire({
                                        title:"Succès",
                                        text:"L'utilisateur a été assigné avec succès",
                                        icon:"success"}).then((res) => {
                                           window.location.replace('/dashboard/companies')  
                                            
                                        })
            
                                })
                        }
                        
                    })
                }} className='w-full' variant={"outline"}>{u.email}</Button></CommandItem>
         })}
          
        </CommandGroup>
      </CommandList>
    </Command>
                    </div>)}
        </div>
    );
};

export default CompanyAccount;