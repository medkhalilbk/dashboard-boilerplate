import SiderBarCompany from '@/components/ui/SideBarCompany';
import React from 'react';
type DashboardProps = {
    children: React.ReactNode;
  };
const RandomPage: React.FC<DashboardProps> = ({ children }) => {
    return (
        <div className="flex ">
        <SiderBarCompany/> 
        <div className="flex-1 overflow-hidden p-4 ml-64">
          {children}
        </div>
      </div>
    );
};

export default RandomPage;