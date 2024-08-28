
"use client"
import { HoursSales } from '@/components/ui/charts/HoursSales';
import { TopsalesProduct } from '@/components/ui/charts/TopSalesProduct';
import axios from 'axios';
import React from 'react';

 export default function CompanyDashboard  ({ })  { 

    return (
<div className="flex flex-col lg:flex-row p-4 gap-4">
  <div className="flex-1 overflow-hidden">
    <TopsalesProduct />
  </div>
  <div className="flex-1 overflow-hidden p-4">
    <HoursSales/>
  </div>
</div>
    );
};
 