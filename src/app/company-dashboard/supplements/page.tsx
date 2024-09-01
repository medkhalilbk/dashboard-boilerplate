"use client"
import { Button } from "@/components/ui/button"
import SearchInput from "@/components/ui/searchBar"
import { RootState } from "@/lib/store"
import React, { ChangeEvent } from "react"
import { useSelector } from "react-redux"
export default function SupplementsPage() {
    const [search, setSearch] = React.useState('')
    const [filteredSupplements,setFilteredSupplements] = React.useState([]) 
    /* const supplements = useSelector((state:RootState) => state.supplements)  */
    return <>
             <h1 className="text-2xl font-bold  my-2 text-center my-4">
          Liste des Supplements ({filteredSupplements?.length? filteredSupplements?.length : 0}) 
        </h1>
          <div className="flex flex-row gap-3 mx-auto justify-center items-center"> 
        <SearchInput onChange={(event:ChangeEvent<HTMLInputElement>) => {
          setSearch(event.target.value)
         // setFilteredSupplements(menus.filter((menu) => menu.name.toLowerCase().includes(search.toLowerCase())))
        }}/>
        <Button className='bg-green-500'>
          Ajouter un Menu
        </Button>
       </div></>
}