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

const Home = () => {
  const [userNAme, setUserNAme] = React.useState("")
  const [password, setPassword] = React.useState("")
  const dispatch = useAppDispatch()
  const router = useRouter()
  return (
    <div className='min-h-screen '> 
    <div className='flex justify-end pr-10 pt-10'>
    <DarkModeToggler/>
    </div>
      <div className="relative flex flex-col justify-center overflow-hidden  -50 py-6 sm:py-12"> 
        <img src="/img/beams.jpg" alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
        <div className="absolute inset-0     mask-image-linear-gradient(180deg,white,rgba(255,255,255,0))"></div>
        <div className="relative   px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="mx-auto max-w-md">
          <MainLogo/>
          <h2 className='py-2'>Email : </h2>
          <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  setUserNAme(e.target.value); 
}} />

          <h2 className='py-2'>Mot de passe : </h2>
         
          </div>
    

          <PasswordInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  setPassword(e.target.value);
          }} />
    
          <Button className='flex justify-center my-5 mx-auto px-10' onClick={() => {
            toast.loading('Loading...') 
              toast.dismiss()
              loginAction({email:userNAme,password:password})
              .then((res:AxiosResponse) => { 
              console.log(res.data)
              toast.dismiss()
              toast.success('Login Success')
              dispatch(setUser(res.data.data))
              router.push('/dashboard')
              })
              .catch((err:any) => {
                toast.dismiss()
                console.log(err)
                toast.error(err?.response.data.message)
              }) 
          }}>Login</Button> 
         </div>
      </div>
    </div>
  );
};

export default Home;
