"use client"
import DashboardLayout from '@/components/dashboardUILayout';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ICompany } from '@/types/company';
import axios from 'axios';
import CompanyForm from '@/components/ui/forms/companyForm';

const Page: React.FC = () => {
    const { id } = useParams() as { id: string };
    const [company, setCompany] = useState<ICompany>();

    useEffect(() => {
        axios
            .get(`/api/companies/${id}`)
            .then((response) => {
                setCompany(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission here
    };

    return (
        <DashboardLayout>
        <CompanyForm company={company} submitAction={() => {
        }}/>
        </DashboardLayout>
    );
};

export default Page;