import SiderBarCompany from "@/components/ui/SideBarCompany"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <div className="flex">
    <SiderBarCompany />
    <div className="flex-1 overflow-hidden p-4 ml-64">
      {children}
    </div>
  </div>
  }