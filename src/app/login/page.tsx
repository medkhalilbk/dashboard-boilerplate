"use client"
import MainLogo from '@/components/ui/MainLogo';
import { Button } from '@/components/ui/button';
import DarkModeToggler from '@/components/ui/darkModeToggler';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/passwordInput';
import React from 'react';
import { toast } from 'sonner';
import { setUser, destroy } from '../../lib/features/userSlice';
import { useAppDispatch } from '@/lib/hooks/store';
import { AxiosResponse } from 'axios';
import { loginAction } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation' 
import Image from 'next/image';

const Home = () => {
  const [userNAme, setUserNAme] = React.useState("")
  const [password, setPassword] = React.useState("")
  const dispatch = useAppDispatch()
  const router = useRouter()
  return (
    <div className='min-h-screen bg-login'> 
    <div className='flex justify-end pr-10 pt-10'>
    <DarkModeToggler/>
    </div>
      <div className="relative flex flex-col justify-center overflow-hidden  -50 py-6 sm:py-12"> 
        <img src="/img/beams.jpg" alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
        <div className="absolute inset-0     mask-image-linear-gradient(180deg,white,rgba(255,255,255,0))"></div>
        <div className="relative   px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="mx-auto max-w-md">
          <Image src={"/logo.png"} height={100} width={200} alt='logo' />
          <h2 className='py-2'>Email : </h2>
          <Input onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
  setUserNAme(e.target.value); 
}} />

          <h2 className='py-2'>Mot de passe : </h2>
         
          </div>
    

          <PasswordInput onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
  setPassword(e.target.value);
          }} />
    
          <Button className='flex justify-center my-5 mx-auto px-10' onClick={() => {
            toast.loading('Loading...') 
              toast.dismiss()
              loginAction({email:userNAme,password:password})
              .then((res:AxiosResponse) => { 
              console.log(res.data)
              toast.dismiss()
              if(typeof window !== 'undefined') {
                localStorage.setItem("email", res.data.data.user.email)
                localStorage.setItem("role", res.data.data.user.role)
                if(!res.data.data.user.companyId) { 
                localStorage.setItem("id" , res.data.data.user.id)
                }
                localStorage.setItem("id", res.data.data.user.companyId)
              }
              if(res.data.data.user.role == "superAdmin") {
                return router.push('/dashboard')
                
               }
               if(res.data.data.user.role == "companyAdmin"){
                return  router.push("/company-dashboard")
               }
               if(res.data.data.user.role  == "user" || res.data.data.user.role == "DeliveryMan") {
                throw new Error("Vous ne pouvez pas se connecter autant qu'utilisateur.")
               }
              toast.success('Connexion réussie')
              dispatch(setUser(res.data.data)) 
              })
              .catch((err:any) => {
                toast.dismiss()
                console.log(err)
                if(err?.response?.data.message)
                {
                return  toast.error(err.response.data.message)
                }{
                  return toast.error('Erreur de connexion')
                }
                
              }) 
          }}>S&apos;authentifier</Button> 
         </div>
      </div>
    </div>
  );
};

export default Home;
