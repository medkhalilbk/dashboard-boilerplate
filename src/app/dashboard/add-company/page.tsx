import DashboardLayout from '@/components/dashboardUILayout';
import CompanyForm from '@/components/ui/forms/companyForm';
import React from 'react';

const AddCompanyPage: React.FC = () => {
    return (
    <DashboardLayout> 
        <CompanyForm/>
    </DashboardLayout>
    );
};

export default AddCompanyPage;