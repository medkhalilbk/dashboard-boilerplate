"use client"
import SiderBarCompany from "@/components/ui/SideBarCompany"
import { Button } from "@/components/ui/button"
import { CircleArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation'

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const pathName = usePathname()
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