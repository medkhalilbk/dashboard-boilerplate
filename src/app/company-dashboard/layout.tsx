"use client"
import SiderBarCompany from "@/components/ui/SideBarCompany"
import { Button } from "@/components/ui/button"
import { CircleArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation'
import socket from "@/socket"
import { useEffect, useState } from "react";
import useSound from 'use-sound'; 
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const pathName = usePathname()
    const [isConnected, setIsConnected] = useState(false); 
const soundUrl = "/sounds/alert.mp3";
const [play] = useSound(soundUrl);
    useEffect(() => {
      if(socket) {
        let id = localStorage.getItem("id")
        socket.on("connect", () => {
          setIsConnected(true);
        });
        socket.on("disconnect", () => {
          setIsConnected(false);
        });
        socket.on("companies-update" , (data:any) => {
          console.log(data?.companyIds)
          if(data.companyIds.includes(id as string)){
            window.alert("added")
            play()
          }
        })
      }
    }, []);
    return <div className="flex">
    <SiderBarCompany />
    <div className="flex-1 overflow-hidden p-4 ml-64">
      <div className="row">{pathName !== "/company-dashboard" && <Button className="bg-green-600" onClick={() => {
        if(typeof window !== "undefined") {
          window.history.back()}
      }}><CircleArrowLeft/></Button>}</div>
      {children}
    </div>
  </div>
  }