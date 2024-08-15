"use client" 
import MenuCard from '@/components/ui/menus/MenuComponent';
import { Spinner } from '@/components/ui/spinner';
import { setMenus } from '@/lib/features/MenuSlice';
import { RootState } from '@/lib/store';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MenuPage: React.FC = () => { 
  const dispatch =useDispatch()
  let menus = useSelector((state: RootState) => state.menus.data)
  React.useEffect(() => {
    if(typeof window !== 'undefined'){
      let id = localStorage.getItem('id')
      axios.get(`/api/companies/${id}/menus`).then((res) => { 
       dispatch(setMenus(res.data.data.menus))
      }).catch((err) => {
        console.log(err)
      })
    }
  } ,[])
    return (
      <div className="grid-rows justify-center mt-8">  
      {menus.length == 0 && <Spinner size={"large"} />}
      <div className="grid grid-cols-1 gap-4"> {/* Adjust grid-cols to the number of columns you want */}
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} /> // Add a unique key if possible
        ))}
      </div>
    </div>
    );
};

export default MenuPage;