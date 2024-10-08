"use client" 
import { Button } from '@/components/ui/button';
import MenuCard from '@/components/ui/menus/MenuComponent';
import SearchInput from '@/components/ui/searchBar';
import { Spinner } from '@/components/ui/spinner';
import { setMenus } from '@/lib/features/MenuSlice';
import { RootState } from '@/lib/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MenuPage: React.FC = () => { 
  const router = useRouter()
  const dispatch =useDispatch()
  let menus = useSelector((state: RootState) => state.menus.data)
  let [empty,setIsEmpty] = useState(false) 
  let [search, setSearch] = useState('')
  let [filteredMenus, setFilteredMenus] = useState<any>([])
  React.useEffect(() => { 
    
    if(typeof window !== 'undefined'){
      let id = localStorage.getItem('id')
      axios.get(`/api/companies/${id}/menus`).then((res) => { 
       setIsEmpty(res.data.data.menu == undefined)
       dispatch(setMenus(res.data.data.menus)) 
      }).catch((err) => {
        console.log(err)
      })
    }
  } ,[])
 
  React.useEffect(() => {
    if (search === "" || search === " ") {
      setFilteredMenus(menus);
    }
  }, [search, menus]);

    return (
      <div className="mx-auto grid-rows justify-center mt-8">  
       <h1 className="text-2xl font-bold  my-2 text-center my-4">
          Liste des Menus ({menus?.length? menus?.length : 0}) 
        </h1>
       <div className="flex flex-row gap-3 mx-auto justify-center items-center"> 
        <SearchInput onChange={(event:ChangeEvent<HTMLInputElement>) => {
          setSearch(event.target.value)
          setFilteredMenus(menus.filter((menu) => menu.name.toLowerCase().includes(search.toLowerCase())))
        }}/>
        <Button className='bg-green-500' onClick={() => {
          router.push('/company-dashboard/menus/add')
        }}>
          Ajouter un Menu
        </Button>
       </div>
      {menus?.length == 0 && !empty && <Spinner size={"large"}  className='my-5'/>}
      <div className="w-full mx-auto px-4 py-6"> 
  {filteredMenus?.length > 0 
    ? filteredMenus.map((menu:any) => <MenuCard key={menu.id} menu={menu} />) 
    : menus?.map((menu:any) => <MenuCard key={menu.id} menu={menu} />)}
</div>
    </div>
    );
};

export default MenuPage;