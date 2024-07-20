import React from 'react';
import SideBar from '@/components/ui/sideBar';
import DashboardLayout from '@/components/dashboardUILayout';
import CardDashboard from '@/components/ui/dashboard/card';
import iconsOrder from "../../../public/icons/Icon_Order.svg"
import iconDelivered from "../../../public/icons/icon_Delivered.svg"
import iconIncome from "../../../public/icons/icon_income.svg"
import { MonthsChart } from '@/components/ui/dashboard/charts';
import { DeliveryChart } from '@/components/ui/dashboard/charts/DevliveryCharts';
import { RestaurantDeliveryChart } from '@/components/ui/dashboard/charts/RestaurauntDeliveryCharts';
import { UserMonthlyChart } from '@/components/ui/dashboard/charts/UserMonthlyChart';
const Dashboard: React.FC = () => {
  return (
    <DashboardLayout> 
        <div className="flex space-x-8 my-4 flex-wrap">
      <div className="flex-1 p-4">
        <CardDashboard percentage='+4%' numbers={50} img={iconsOrder} description='Total de commandes'/> 
      </div>
      <div className="flex-1 p-4">
        <CardDashboard percentage='-14%' numbers={69} img={iconDelivered} description='Total de livraisons'/> </div>
      <div className="flex-1 p-4">
        <CardDashboard percentage='+50%' numbers={"10 000 TND"} img={iconIncome} description='Total de revenus'/></div>
      <div className="flex-1 p-4"> <CardDashboard numbers={"500 TND"} img={iconIncome} description='Revenus quotidien'/></div>
    </div>
    <div className="flex justify-center items-center space-x-4">
  <div className="flex-1 max-w-md"> 
    <MonthsChart/>
  </div>
  <div className="flex-1 max-w-md">
    <RestaurantDeliveryChart/>
  </div>
  <div className="flex-1 max-w-md"> 
    <DeliveryChart/>
  </div>
  
</div>
<div className="w-1/2 mx-auto my-4">
  <UserMonthlyChart/>
</div>
    </DashboardLayout>
  );
};

export default Dashboard;
