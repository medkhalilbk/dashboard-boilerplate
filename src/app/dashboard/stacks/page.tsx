"use client"
import DashboardLayout from '@/components/dashboardUILayout'
import { deleteStackAction, getStacksAction } from '@/lib/actions/stacks'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from "@/components/ui/progress"
import { useDispatch, useSelector } from 'react-redux'
import { deleteStack, setStacks } from '@/lib/features/stackSlice'
import { IStack } from '@/types/Stack'  
import { toast } from 'sonner'; 
import DialogAddStack from '@/components/StackDialog/DialogAddStack'
import DialogEditStack from '@/components/StackDialog/DialogEditStack'
type Props = {}

function StacksPage({}: Props) { 
  const dispatch = useDispatch()
  const stacksData = useSelector((state: any) => state.stacks.data)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true) 
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 90 ? prev + 10 : prev)) // Increment by 10, max 90
    }, 300)  

    getStacksAction().then((res) => { 
      dispatch(setStacks(res.data.stacks)) 
      setLoading(false)
      setProgress(100)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    }).finally(() => {
      clearInterval(interval)
    })

    return () => clearInterval(interval)
  }, [dispatch])

  useEffect(() => { 
  }, [stacksData])

  return (
    <DashboardLayout>
      <div className='flex w-3/2 py-4'>
        <h1 className="scroll-m-20 text-3xl mr-5 font-extrabold tracking-tight lg:text-3xl">Stacks 🛠️ </h1>
        <DialogAddStack/>
      </div>
      {loading ? (
        <Progress value={progress} style={{width:"50%" , marginTop:"5%", margin:"auto"}} />
      ) : (
        <div className='my-5 flex flex-wrap'>
          {stacksData.length > 0 && stacksData.map((stack: IStack, index: number) => {
            return (
              <Card className="w-[250px] m-4" key={index}>
                <CardHeader>
                  <CardTitle className='text-center'>{stack.name}</CardTitle>
                  <CardDescription>
                    <Image className='mx-auto' src={stack.iconUrl} height={50} width={50} alt={'icon'} />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex justify-center'>
                    <Button className='mr-3' onClick={() => {
                      console.log(stack.id)
                       if(stack.id) {
                        deleteStackAction(stack.id).then((res) => {
                        console.log(res.data)
                        if(stack.id){ 
                        dispatch(deleteStack(stack.id)) 
                        }
                        toast.success(res.data.message)
                        })
                       }
                    
                    }} >Delete</Button>
                    <DialogEditStack id={stack.id ?? ''} stackNameProps={stack.name} stackUrlProps={stack.iconUrl}/>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )} 
      <div></div>
    </DashboardLayout>
  )
} 
export default StacksPage
 

