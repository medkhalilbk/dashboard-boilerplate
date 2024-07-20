"use client"
import DashboardLayout from '@/components/dashboardUILayout'
import { Button } from '@/components/ui/button'
import CompanyCard from '@/components/ui/companies/CompanyCard'
import { RootState } from '@/lib/store'
import { ICompany } from '@/types/company'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { UseSelector, useSelector } from 'react-redux'
 

function ComapaniesPage() {
  const companies = useSelector((state: any) => state.company.data) as ICompany[]
  const router = useRouter()
  return (
    <DashboardLayout>
      <div className='flex flex-col w-3/2 py-4'>
      <div className="flex flex-row justify-between items-center my-4">
      <h1 className="scroll-m-20 text-3xl mr-5 font-extrabold tracking-tight lg:text-3xl">Entreprises 🏦</h1>
      <button onClick={() => {router.push('/dashboard/comapnies/add')}} className="flex-shrink-0 bg-green-200 text-gray- duration-75	 border-gray-300 border rounded-md py-4 px-4 flex items-center justify-center text-sm font-medium hover:bg-green-100 focus:outline-none ">
        <PlusIcon className="h-4 w-4 mr-1" />
   Ajouter 
      </button>
    </div>

         {companies.map((company:ICompany) => {
          return <div className="my-2"> <CompanyCard phoneNumber={company.phoneNumber || ""} name={company.name} description={company.description} speciality={company.specialty || ""} mainImage={company.mainImage}  /></div>
         })}
        </div>
    </DashboardLayout>
  )
}

export default ComapaniesPage