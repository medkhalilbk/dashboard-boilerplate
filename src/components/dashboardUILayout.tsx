import React from 'react';
import SideBar from '@/components/ui/sideBar';

type DashboardProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 overflow-hidden p-4 ml-64">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
