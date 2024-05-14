"use client"
import { useTheme } from 'next-themes'
import React from 'react'

type Props = {}

function MainLogo({}: Props) { 

    const {theme} = useTheme()
React.useEffect(() => {
 
}, [theme])

  return (
    <div className='flex justify-center'>
<img src="https://www.khalil.work/svg/leftLogo.png" alt="" className={theme == "dark" ?  "" : "invert"} width="100"  />
    </div>
  )
}

export default MainLogo