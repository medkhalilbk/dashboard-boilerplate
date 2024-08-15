"use client"
import Link from 'next/link';
import React from 'react';
import Image from 'next/image'; 
import { usePathname,useRouter } from 'next/navigation' 
import {TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { Button } from './button';
import { cookies } from 'next/headers';
import { deleteCookies } from '@/app/actions';


function SiderBarCompany() {
  const pathname = usePathname() 
  let [email,setEmail] = React.useState<string | null>(null)
  React.useEffect(() => {
    if(typeof window !== 'undefined') {
      setEmail(localStorage.getItem('email'))}
  }) 
  let router = useRouter() 
  return (
    <aside id="sidebar" className="fixed left-0 top-0 z-40 h-screen w-64  " aria-label="Sidebar">
      <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-stone-950">
        <div className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
          <Link href={"/company-dashboard"}>
          <Image src={"/logo.png"} height={100} width={200} alt='logo' /> </Link>
        </div>
        <ul className="space-y-2 text-sm font-medium"> 
          <li>
          <Link 
      href="/company-dashboard/menus" 
      className={pathname === "/company-dashboard/menus" 
        ? "flex items-center rounded-lg px-3 bg-green-200   py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700" 
        : "flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"}
    >
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M21.93 6.76001L18.56 20.29C18.32 21.3 17.42 22 16.38 22H3.24001C1.73001 22 0.650023 20.5199 1.10002 19.0699L5.31001 5.55005C5.60001 4.61005 6.47003 3.95996 7.45003 3.95996H19.75C20.7 3.95996 21.49 4.53997 21.82 5.33997C22.01 5.76997 22.05 6.26001 21.93 6.76001Z" 
      stroke="#292D32" 
      strokeWidth="1.5" 
      strokeMiterlimit="10"
    />
    <path 
      d="M16 22H20.78C22.07 22 23.08 20.91 22.99 19.62L22 6" 
      stroke="#292D32" 
      strokeWidth="1.5" 
      strokeMiterlimit="10" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9.67999 6.38L10.72 2.06006" 
      stroke="#292D32" 
      strokeWidth="1.5" 
      strokeMiterlimit="10" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16.38 6.39001L17.32 2.05005" 
      stroke="#292D32" 
      strokeWidth="1.5" 
      strokeMiterlimit="10" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M7.70001 12H15.7" 
      stroke="#292D32" 
      strokeWidth="1.5" 
      strokeMiterlimit="10" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M6.70001 16H14.7" 
      stroke="#292D32" 
      strokeWidth="1.5" 
      strokeMiterlimit="10" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
      <span className="ml-3 flex-1 whitespace-nowrap">Menus</span>
    </Link>
          </li>
          <li>
          <Link 
      href="/company-dashboard/products" 
      className={pathname === "/company-dashboard/products" 
        ? "flex items-center rounded-lg px-3 bg-green-200   py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700" 
        : "flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"}
    >
        <svg 
    fill="#000000" 
    height="24" 
    width="24" 
    version="1.1" 
    id="Layer_1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    viewBox="0 0 512 512" 
    xmlSpace="preserve"
  >
    <g>
      <g>
        <path d="M468.885,398.052C497.134,355.933,512,307.127,512,256C512,114.842,397.158,0,256,0S0,114.842,0,256s114.842,256,256,256
          c51.124,0,99.93-14.866,142.05-43.115l28.446,28.446c19.526,19.528,51.307,19.529,70.834,0c19.529-19.529,19.529-51.305,0-70.834
          L468.885,398.052z M256,478.609c-122.746,0-222.609-99.862-222.609-222.609S133.254,33.391,256,33.391
          S478.609,133.254,478.609,256c0,42.209-11.657,82.597-33.862,117.915l-24.329-24.329c16.262-28.455,24.8-60.534,24.8-93.586
          c0-104.334-84.883-189.217-189.217-189.217S66.783,151.666,66.783,256S151.666,445.217,256,445.217
          c33.05,0,65.129-8.537,93.582-24.799l24.33,24.33C338.593,466.953,298.207,478.609,256,478.609z M319.569,201.517l-61.054-61.054
          c-6.519-6.519-17.091-6.519-23.611,0c-6.52,6.519-6.52,17.091,0,23.611l42.332,42.332l-23.611,23.611l-42.333-42.332
          c-6.519-6.519-17.091-6.519-23.611,0c-6.52,6.519-6.52,17.091,0,23.611l42.332,42.332l-23.612,23.612l-42.332-42.332
          c-6.519-6.519-17.091-6.519-23.611,0s-6.52,17.091,0,23.611l61.054,61.054c28.839,28.84,73.002,31.922,105.072,10.627l21.93,21.93
          c-6.305,13.236-6.477,28.682-0.516,42.04c-22.137,11.59-46.721,17.656-71.998,17.656c-85.922,0-155.826-69.904-155.826-155.826
          S170.077,100.174,256,100.174S411.826,170.077,411.826,256c0,25.278-6.066,49.862-17.66,72.004
          c-13.358-5.96-28.802-5.79-42.04,0.515l-21.93-21.93C351.468,274.554,348.436,230.384,319.569,201.517z M295.959,295.961
          c-17.992,17.991-46.067,19.37-65.604,4.55l70.154-70.154C315.317,249.879,313.966,277.954,295.959,295.961z M473.718,473.72
          c-6.51,6.509-17.1,6.51-23.612,0c-8.304-8.304-80.087-80.087-88.204-88.204c-6.51-6.51-6.51-17.102,0-23.612
          c6.512-6.51,17.1-6.51,23.612,0c7.988,7.988,79.98,79.98,88.204,88.204C480.228,456.618,480.228,467.211,473.718,473.72z"/>
      </g>
    </g>
  </svg>
      <span className="ml-3 flex-1 whitespace-nowrap">Produits</span>
      </Link>
          </li>
          <li>
          <Link 
      href="/company-dashboard/orders" 
      className={pathname === "/company-dashboard/orders" 
        ? "flex items-center rounded-lg px-3 bg-green-200 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700" 
        : "flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"}
    >
          <svg  width="24" height="24"
      viewBox="0 0 1024 1024" 
      fill="#000000" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M959.018 208.158c0.23-2.721 0.34-5.45 0.34-8.172 0-74.93-60.96-135.89-135.89-135.89-1.54 0-3.036 0.06-6.522 0.213l-611.757-0.043c-1.768-0.085-3.563-0.17-5.424-0.17-74.812 0-135.67 60.84-135.67 135.712l0.188 10.952h-0.306l0.391 594.972-0.162 20.382c0 74.03 60.22 134.25 134.24 134.25 1.668 0 7.007-0.239 7.1-0.239l608.934 0.085c2.985 0.357 6.216 0.468 9.55 0.468 35.815 0 69.514-13.954 94.879-39.302 25.373-25.34 39.344-58.987 39.344-94.794l-0.145-12.015h0.918l-0.008-606.41z m-757.655 693.82l-2.585-0.203c-42.524 0-76.146-34.863-76.537-79.309V332.671H900.79l0.46 485.186-0.885 2.865c-0.535 1.837-0.8 3.58-0.8 5.17 0 40.382-31.555 73.766-71.852 76.002l-10.816 0.621v-0.527l-615.533-0.01zM900.78 274.424H122.3l-0.375-65.934 0.85-2.924c0.52-1.82 0.782-3.63 0.782-5.247 0-42.236 34.727-76.665 78.179-76.809l0.45-0.068 618.177 0.018 2.662 0.203c42.329 0 76.767 34.439 76.767 76.768 0 1.326 0.196 2.687 0.655 4.532l0.332 0.884v68.577z" fill="#000000" />
      <path d="M697.67 471.435c-7.882 0-15.314 3.078-20.918 8.682l-223.43 223.439L346.599 596.84c-5.544-5.603-12.95-8.69-20.842-8.69s-15.323 3.078-20.918 8.665c-5.578 5.518-8.674 12.9-8.7 20.79-0.017 7.908 3.07 15.357 8.69 20.994l127.55 127.558c5.57 5.56 13.01 8.622 20.943 8.622 7.925 0 15.364-3.06 20.934-8.63l244.247-244.247c5.578-5.511 8.674-12.883 8.7-20.783 0.017-7.942-3.079-15.408-8.682-20.986-5.552-5.612-12.958-8.698-20.85-8.698z" fill="#000000" />
    </svg>
      <span className="ml-3 flex-1 whitespace-nowrap">Commandes</span>
    </Link>

          </li>
          <li>
            <Link href={"/dashboard/users"} className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="6" r="4" fill="black"/>
<path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" fill="#1C274C"/>
</svg>
  <span className="ml-3 flex-1 whitespace-nowrap">Utilisateurs</span>
            </Link>
          </li>
        </ul>
        <div className="mt-auto flex">
        <div className="flex w-full justify-between">
            <span className="text-sm font-medium text-black dark:text-white">{email || "Utilisateur"}</span>
          
            <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-roledescription="more menu" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-black dark:text-white">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
        </TooltipTrigger>
        <TooltipContent>
           <Button variant={"outline"} onClick={() => {
            if(typeof window !== 'undefined') {
              deleteCookies().then(() => {
                localStorage.removeItem('email')
                localStorage.removeItem('role')
                localStorage.removeItem('id')
              }).catch((err:Error) => {
                console.log(err)
              })
              return router.push('/login')
            }
           }}>Deconnexion</Button>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SiderBarCompany;
