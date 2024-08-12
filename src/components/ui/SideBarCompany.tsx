"use client"
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import  { useRouter } from 'next/router';import { usePathname } from 'next/navigation'

type Props = {email?:string};

function SiderBarCompany({email}: Props) {
  const pathname = usePathname() 
  return (
    <aside id="sidebar" className="fixed left-0 top-0 z-40 h-screen w-64  " aria-label="Sidebar">
      <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-stone-950">
        <div className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
          <Link href={"/company-dashboard"}>
          <Image src={"/logo.png"} height={100} width={200} alt='logo' /> </Link>
        </div>
        <ul className="space-y-2 text-sm font-medium">
          <li>
            <Link href={"/company-dashboard"} className={pathname == "/company-dashboard" ? "flex items-center rounded-lg px-3   bg-green-200  py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700" : "flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"}>
              <span className="ml-3 flex-1 whitespace-nowrap" >Accueil</span>
            </Link>
          </li>
          <li>
          <Link 
      href="/dashboard/companies" 
      className={pathname === "/dashboard/companies" 
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
      href="/dashboard/delivery-mans" 
      className={pathname === "/dashboard/delivery-mans" 
        ? "flex items-center rounded-lg px-3 bg-green-200 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700" 
        : "flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"}
    >
      
      <span className="ml-3 flex-1 whitespace-nowrap">Livreurs</span>
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
            <span className="text-sm font-medium text-black dark:text-white">{email || "default login"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-roledescription="more menu" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-black dark:text-white">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SiderBarCompany;
