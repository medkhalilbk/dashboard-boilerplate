"use client"
import DashboardLayout from '@/components/dashboardUILayout';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { generatePassword } from '@/lib/utils';
import axios from 'axios';
import { useParams , useRouter } from 'next/navigation'; 
import React from 'react';
import Swal from 'sweetalert2';

interface PageProps {
    // Define your props here
}

const Page: React.FC<PageProps> = (props) => {
    let {id} = useParams();
    let [user, setUser] = React.useState<any>(null);
    let [email, setEmail] = React.useState<string>('');
    let [password, setPassword] = React.useState<string>('');
    let [loading, setLoading] = React.useState<boolean>(true);
    let router = useRouter()
    React.useEffect(() => {
        axios.get('/api/users/' + id).then((res) => {
            setUser(res.data.data);
            setEmail(res.data.data.email); // Assuming the API returns an email field
            setLoading(false);
        });
    }, [id]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here 
        if(!email || !password){
            Swal.fire({
                title: 'Erreur',
                text: 'Veuillez remplir tous les champs',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return;
        }
        if(password.length < 8){
            Swal.fire({
                title: 'Erreur',
                text: 'Le mot de passe doit contenir au moins 8 caractères',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        } 
        axios.patch("/api/users/" + id, { email, password }).then((res) => {
            Swal.fire({
                title: 'Succès',
                text: 'Utilisateur mis à jour avec succès',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((res) => {
                if(res.isConfirmed){
                    router.push('/dashboard/companies')
                }
            })
        }).catch((err:any) => {
            console.log(err.response.data)
            Swal.fire({
                title: 'Erreur',
                text: err.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        })
    };

    return (
        <DashboardLayout>
            {loading ? (
                <Spinner size={"large"} />
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 w-2/3 mx-auto mt-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        <Button disabled={password?true:false} onClick={() => {
                           let newPass = generatePassword()
                           Swal.fire({
                            title: 'Nouveau mot de passe',
                            text: newPass,
                            icon: 'info',
                            confirmButtonText: 'Ok'
                           }).then((res) => {
                            if(res.isConfirmed){
                                setPassword(newPass)
                            }
                           })
                        }} className='mt-4'>Générer un mot de passe</Button>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Mettre à jour
                        </button>
                    </div>
                </form>
            )}
        </DashboardLayout>
    );
};

export default Page;
