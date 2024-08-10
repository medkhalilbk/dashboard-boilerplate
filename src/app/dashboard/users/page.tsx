"use client"
import DashboardLayout from '@/components/dashboardUILayout';
import { useRouter } from 'next/navigation';
import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'; 
import { setClients } from '@/lib/features/clientsSlice'; 
import { Spinner } from '@/components/ui/spinner';
import { ClientCard } from '@/components/ui/user/userCard';
const Page: React.FC = () => {
    let router = useRouter()
    const dispatch = useDispatch()
    const clients =  useSelector((state: any) => state.clients.data)
    let [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        axios.get('/api/users').then((res:any) => { 
            dispatch(setClients(res.data.data.users))
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    } , [])
    React.useEffect(() => {
        console.log(clients)
    } , [clients])
    return (
        <DashboardLayout>
             <div className="flex flex-row justify-between items-center my-4 px-4">
          <h1 className="scroll-m-20 text-3xl mr-5 font-extrabold tracking-tight lg:text-3xl">Utilisateurs 🙍‍♂️</h1> 
           
        </div>
        <div className="div">
               {loading && <Spinner size="large" />}
               {!loading && clients.map((client:any) => {
                   return <div className="w-100 my-2">
                    <ClientCard user={client}/>
                   </div>
               })}
            </div>
        </DashboardLayout>
    );
};

export default Page;