import SiderBarCompany from "@/components/ui/SideBarCompany"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section><SiderBarCompany/> {children}</section>
  }