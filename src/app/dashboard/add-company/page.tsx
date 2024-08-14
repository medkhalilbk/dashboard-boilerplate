"use client"
import DashboardLayout from '@/components/dashboardUILayout';
import CompanyAccount from '@/components/ui/forms/CompanyAccount';
import CompanyForm from '@/components/ui/forms/companyForm';
import ImageCompany from '@/components/ui/forms/ImageCompany';
import React, { useState } from 'react';

const AddCompanyPage: React.FC = () => {
    const [company, setCompany] = useState<any>(null)
    const [step,setStep] = useState(1)
    return (
    <DashboardLayout>  
        {(!company && step == 1) && <CompanyForm setStep={setStep} submitAction={setCompany}/>}
        {(company && step == 2) && <ImageCompany companyId={company.id} setStep={setStep} />}   
         {(step == 3 && company) && <CompanyAccount company={company}  />}     
    </DashboardLayout>
    );
};

export default AddCompanyPage;