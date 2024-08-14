"use client"
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
type DashboardProps = {
    children: React.ReactNode;
  };


const MenuPage: React.FC<DashboardProps> = ({ children }) => {
  let [menus,setMenus] = useState([])
useEffect(() => {
  console.log(localStorage.getItem("id"))
  fetch(`/api/companies/menus/${localStorage.getItem("id")}`).then((res)=>{
    if(res.ok){
      let body = res.json()
      body.then((data)=>{
        console.log(data)
      })
    }
  })
} , [])
    return (
        <div className="flex "> 
       test
      </div>
    );
};

export default MenuPage;