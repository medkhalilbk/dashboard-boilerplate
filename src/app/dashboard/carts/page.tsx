import getAllCartsDetailsService from "@/app/api/carts/services"
import DashboardLayout from "@/components/dashboardUILayout"

 
export  default async  function CartsPage() {
    try {  
        let data : any = await getAllCartsDetailsService()
        return   <DashboardLayout> {JSON.stringify(data)}</DashboardLayout>
    } catch (error) {
        
    }
 
}