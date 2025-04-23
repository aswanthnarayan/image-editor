"use client"
import { Button} from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import CustomCanvasDialog from './CustomCanvasDialog'

const RecentDesign = () => {
    const [designList,setDesignList] = useState([])
  return (
    <div className='mt-7'>
<h2 className='text-lg font-bold'>Recent Design</h2>
   {
    designList.length==0?
    <div className='flex flex-col gap-4 items-center '>
        <Image src={'/edittool.png'} alt="edit" width={100} height={100} className="" />
        <h2 className="text-center">You dont have any design created yet</h2>
    <CustomCanvasDialog><Button>+ Create New</Button></CustomCanvasDialog>
   </div>
   :<></>
   }
    </div>
  )
}

export default RecentDesign