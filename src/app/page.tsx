import React from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
type Props = {} 
function Page({}: Props) { 
redirect("/login") 
  return (
    <div>page</div>
  )
}

export default Page