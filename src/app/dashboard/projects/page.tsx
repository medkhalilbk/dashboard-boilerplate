import DialogAddProject from '@/components/ProjectsDialog/DialogAddProject'
import DashboardLayout from '@/components/dashboardUILayout'
import React from 'react'

type Props = {}

function ProjectsPage({}: Props) {
  return (
    <DashboardLayout>
      <div className='flex w-3/2 py-4'>
        <h1 className="scroll-m-20 text-3xl mr-5 font-extrabold tracking-tight lg:text-3xl">Projects 🚀</h1>
        <DialogAddProject/>
        </div>
    </DashboardLayout>
  )
}

export default ProjectsPage