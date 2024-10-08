"use client"
import Link from 'next/link';
import React from 'react';
import Image from 'next/image'; 
import { usePathname,useRouter } from 'next/navigation' 
import {TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { Button } from './button';
import { cookies } from 'next/headers';
import { deleteCookies } from '@/app/actions';

function SideBar( ) {
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
          <Link href={"/dashboard"}>
          <Image src={"/logo.png"} height={100} width={200} alt='logo' /> </Link>
        </div>
        <ul className="space-y-2 text-sm font-medium">
          <li>
            <Link href={"/dashboard"} className={pathname == "/dashboard" ? "flex items-center rounded-lg px-3   bg-green-200  py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700" : "flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="ml-3 flex-1 whitespace-nowrap" > Accueil</span>
            </Link>
          </li>
          <li>
          <Link 
      href="/dashboard/companies" 
      className={pathname === "/dashboard/companies" 
        ? "flex items-center rounded-lg px-3 bg-green-200   py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700" 
        : "flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"}
    >
      <svg fill="#000000" width="19" height="19" viewBox="0 -2.89 122.88 122.88" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M36.82,107.86L35.65,78.4l13.25-0.53c5.66,0.78,11.39,3.61,17.15,6.92l10.29-0.41c4.67,0.1,7.3,4.72,2.89,8 
          c-3.5,2.79-8.27,2.83-13.17,2.58c-3.37-0.03-3.34,4.5,0.17,4.37c1.22,0.05,2.54-0.29,3.69-0.34c6.09-0.25,11.06-1.61,13.94-6.55 
          l1.4-3.66l15.01-8.2c7.56-2.83,12.65,4.3,7.23,10.1c-10.77,8.51-21.2,16.27-32.62,22.09c-8.24,5.47-16.7,5.64-25.34,1.01 
          L36.82,107.86L36.82,107.86z M29.74,62.97h91.9c0.68,0,1.24,0.57,1.24,1.24v5.41c0,0.67-0.56,1.24-1.24,1.24h-91.9 
          c-0.68,0-1.24-0.56-1.24-1.24v-5.41C28.5,63.53,29.06,62.97,29.74,62.97L29.74,62.97z M79.26,11.23 
          c25.16,2.01,46.35,23.16,43.22,48.06l-93.57,0C25.82,34.23,47.09,13.05,72.43,11.2V7.14l-4,0c-0.7,0-1.28-0.58-1.28-1.28V1.28 
          c0-0.7,0.57-1.28,1.28-1.28h14.72c0.7,0,1.28,0.58,1.28,1.28v4.58c0,0.7-0.58,1.28-1.28,1.28h-3.89L79.26,11.23L79.26,11.23 
          L79.26,11.23z M0,77.39l31.55-1.66l1.4,35.25L1.4,112.63L0,77.39L0,77.39z" 
          style={{ fill: '#000000' }} 
        />
      </svg>
      <span className="ml-3 flex-1 whitespace-nowrap">Entreprises</span>
    </Link>
          </li>
          <li>
          <Link 
      href="/dashboard/delivery-mans" 
      className={pathname === "/dashboard/delivery-mans" 
        ? "flex items-center rounded-lg px-3 bg-green-200 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700" 
        : "flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"}
    >
      <svg width="24" height="24" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M162.035,648.914c-1.491,6.33-2.282,12.926-2.282,19.707c0,47.333,38.363,85.706,85.697,85.706 c45.511,0,82.743-35.484,85.531-80.296l-28.934-4.287c-0.589,30.709-25.759,55.503-56.597,55.503 c-31.215,0-56.616-25.401-56.616-56.625c0-5.345,0.745-10.507,2.125-15.41L162.035,648.914z" 
          style={{ fill: '#231F20' }} 
        />
        <path 
          d="M754.298,646.528c-4.241-2.729-9.289-4.312-14.708-4.312c-7.715,0-14.683,3.208-19.642,8.361 c-3.069,3.193-5.37,7.133-6.598,11.52c-0.656,2.341-1.007,4.811-1.007,7.363c0,15.049,12.198,27.247,27.247,27.247 c15.046,0,27.244-12.198,27.244-27.247c0-2.552-0.351-5.022-1.007-7.363C764.007,655.602,759.839,650.087,754.298,646.528z" 
          style={{ fill: '#231F20' }} 
        />
        <path 
          d="M272.608,669.457c0-1.408-0.11-2.797-0.313-4.149l-51.482-7.655c-0.69,1.417-1.251,2.898-1.684,4.444 c-0.653,2.346-1.003,4.811-1.003,7.36c0,15.051,12.19,27.25,27.241,27.25C260.418,696.707,272.608,684.508,272.608,669.457z" 
          style={{ fill: '#231F20' }} 
        />
        <path 
          d="M794.047,525.35c0.405-34.508-6.863-63.736-31.786-66.91 c-63.984-8.142-183.813-13.957-177.989,27.921c5.814,41.878,57.002,89.579,44.205,112.431 c-12.797,22.843-195.441,21.353-223.363,5.07c-27.921-16.284-61.657-132.626-36.063-204.771 c8.904-25.122,11.597-47.111,11.341-65.13h27.642c2.773,3.201,6.858,5.235,11.426,5.235h51.963c8.353,0,15.124-6.771,15.124-15.123 c0-8.353-6.771-15.124-15.124-15.124h-51.963c-4.568,0-8.653,2.034-11.426,5.235h-29.866c-2.435-8.297-7.083-15.603-13.248-21.277 c-2.051-1.886-4.259-3.588-6.624-5.088c-4.48-24.526-19.964-42.144-38.888-42.144c-22.539,0-40.193,24.987-40.193,56.874 c0,27.296,12.925,49.523,30.782,55.364c-9.219,12.08-21.426,25.668-37.508,40.83c-56.58,53.322-65.706,118.853-65.135,158.338 c-25.747,10.699-46.251,32.458-54.722,60.233c-2.211,7.247,2.565,14.766,10.059,15.882l4.414,0.657l30.507,4.535l16.338,2.429 l38.364,5.704l47.729,7.102l30.479,4.526l4.424,0.658c7.448,1.108,14.246-4.616,14.242-12.146c0-0.047,0-0.094,0-0.141h308.673 c-2.042,7.295-3.137,14.986-3.137,22.935c0,46.873,37.995,84.869,84.869,84.869c46.864,0,84.859-37.996,84.859-84.869 c0-7.949-1.095-15.64-3.137-22.935h1.113c9.521,0,18.04-6.044,21.076-15.079c2.861-8.501,4.407-17.6,4.407-27.066 C847.912,568.452,825.583,537.733,794.047,525.35z M325.912,333.506c-2.107,1.886-4.343,2.916-6.505,2.916 c-8.114,0-17.194-14.49-17.194-33.874c0-19.384,9.08-33.875,17.194-33.875c7.995,0,16.937,14.086,17.186,33.056 c0.009,0.267,0.009,0.543,0.009,0.819C336.602,316.762,331.717,328.345,325.912,333.506z M739.593,725.447 c-30.874,0-55.991-25.116-55.991-55.99c0-8.16,1.757-15.925,4.913-22.935h0.865c-0.156-0.276-0.322-0.562-0.478-0.837 c8.96-19.016,28.317-32.209,50.691-32.209c15.088,0,28.795,5.989,38.87,15.732c5.087,4.913,9.246,10.782,12.19,17.314 c3.165,7.01,4.921,14.775,4.921,22.935C795.574,700.331,770.458,725.447,739.593,725.447z" 
          style={{ fill: '#231F20' }} 
        />
        <path 
          d="M450.634,597.496c16.845,1.693,38.74,2.898,64.822,2.898c55.797,0,90.361-5.75,99.432-10.286 c-0.046-1.444-0.534-4.535-2.98-10.221c-3.202-7.397-8.399-16.173-13.975-25.493c-32.696,24.223-83.415,18.768-111.383,20.663 C466.063,576.446,455.786,587.165,450.634,597.496z" 
          style={{ fill: '#231F20' }} 
        />
        <path 
          d="M770.154,444.051l-11.564-15.75c-7.415-10.093-18.859-16.422-31.344-17.342 c-20.92-1.545-54.399-2.787-81.216,1.877c-24.417,4.25-35.972,19.826-41.372,32.246c17.323-5.41,41.049-8.068,71.529-8.068 c36.192,0,70.701,3.707,88.052,5.915C766.19,443.177,768.167,443.545,770.154,444.051z" 
          style={{ fill: '#231F20' }} 
        />
      </svg>
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

export default SideBar;
