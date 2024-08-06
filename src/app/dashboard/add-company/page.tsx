"use client"
import DashboardLayout from '@/components/dashboardUILayout';
import CompanyForm from '@/components/ui/forms/companyForm';
import ImageCompany from '@/components/ui/forms/ImageCompany';
import React, { useState } from 'react';

const AddCompanyPage: React.FC = () => {
    const [dataFormIsSet, setDataFormIsSet] = useState(false)
    return (
    <DashboardLayout> 
        {!dataFormIsSet && <CompanyForm submitAction={setDataFormIsSet}/>}
        
{dataFormIsSet && <ImageCompany/>}        
   
    </DashboardLayout>
    );
};

export default AddCompanyPage;