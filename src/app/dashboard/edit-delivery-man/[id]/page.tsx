"use client"
import React from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/dashboardUILayout';
interface Props {
    id: string;
} 
const Page: React.FC<Props> = () => {
    const { id } = useParams<{ id: string }>();
    return (
<DashboardLayout>
<div>
 
</div>
</DashboardLayout>
    );
};

export default Page;