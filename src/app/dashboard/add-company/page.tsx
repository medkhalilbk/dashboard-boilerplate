"use client"
import DashboardLayout from '@/components/dashboardUILayout';
import CompanyForm from '@/components/ui/forms/companyForm';
import ImageCompany from '@/components/ui/forms/ImageCompany';
import React, { useState } from 'react';

const AddCompanyPage: React.FC = () => {
    const [comapnyId, setCompanyId] = useState(null)
    return (
    <DashboardLayout>  
        {!comapnyId && <CompanyForm submitAction={setCompanyId}/>}
        {comapnyId && <ImageCompany companyId={comapnyId}  />}         
    </DashboardLayout>
    );
};

export default AddCompanyPage;