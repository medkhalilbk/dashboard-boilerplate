"use client"
import DashboardLayout from '@/components/dashboardUILayout'
import CompanyCard from '@/components/ui/companies/CompanyCard'
import SearchBar from '@/components/ui/searchBar'
import { Spinner } from '@/components/ui/spinner'
import { addCompany } from '@/lib/features/companySlice'
import { ICompany } from '@/types/company'
import axios from 'axios'
import { PlusIcon, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
 
function CompaniesPage() {
  const companies = useSelector((state: any) => state.company.data) as ICompany[]
  const dispatch = useDispatch()

  React.useEffect(() => {
    async function fetchCompanies() {
      try {
        const { data } = await axios.get('/api/companies')
        return data.data
      } catch (error) {
        console.error("Error fetching companies", error)
      }
    }

    if (companies.length === 0) {
      fetchCompanies().then((data: ICompany[]) => {
        console.log(data)
        if (data) {
          data.forEach(company => {
            dispatch(addCompany(company))
          })
        }
      })
    }
  }, [companies.length, dispatch])

  const router = useRouter()

  return (
    <DashboardLayout>
      <div className='flex flex-col w-3/2 py-4'>
        <div className="flex flex-row justify-between items-center my-4 px-4">
          <h1 className="scroll-m-20 text-3xl mr-5 font-extrabold tracking-tight lg:text-3xl">Entreprises 🏦</h1>
          <button 
            onClick={() => {router.push('/dashboard/add-company')}} 
            className="flex-shrink-0 bg-green-200 text-gray-700 duration-75 border-gray-300 border rounded-md py-4 px-4 flex items-center justify-center text-sm font-medium hover:bg-green-100 focus:outline-none"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Ajouter 
          </button>
        </div>
        <div className="flex flex-row">
          <SearchBar onChange={() => {
            
          }} className='w-full' />
        </div>
      {!companies.length && <Spinner size="large" />}
      {companies.length > 0 && companies.map((company: ICompany) => (
          <div className="my-2" key={company.id}> 
            <CompanyCard 
            id={company.id}
              phoneNumber={company.phoneNumber || ""} 
              name={company.name} 
              description={company.description} 
              speciality={company.specialty || ""} 
              mainImage={company.mainImage} 
            />
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}

export default CompaniesPage
