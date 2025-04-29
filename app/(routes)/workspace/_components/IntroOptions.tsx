
"use client"
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import {canvasSizeOptions} from '../../../../services/Options'
import { useMutation } from 'convex/react'
import { CreateNewDesign } from '@/convex/design'
import { UserDetailContext } from '@/context/UserDetailContext'
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner'
import { useRouter } from 'next/navigation';
import { FullScreenLoader } from '@/components/ui/FullScreenLoader'
import { Id } from '@/convex/_generated/dataModel'


const IntroOptions = () => {
  const { userDetail } = useContext(UserDetailContext);
  const createDesignRecord = useMutation(api.design.CreateNewDesign);
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false)

  const OnCanvasOptionSelect = async (option: any) => {
    setIsLoading(true);
    toast("Creating new design...");
    try {
      const result = await createDesignRecord({
        name: option.name,
        width: option.width,
        height: option.height,
        uid: userDetail._id as Id<"users">
      });
      toast("Design created successfully");
      router.push(`/design/${result}`);
    } catch (e) {
      toast.error("Failed to create design");
      setIsLoading(false); 
    }
  };
  return (
    <div>
      {isLoading&& <FullScreenLoader/>}
      <div className='relative'>
        <Image src="/banner-home.png" alt="banner" width={1800} height={300} className="w-full h-[150px] object-cover rounded-xl" priority />
    <h2 className='text-2xl font-bold absolute bottom-5 left-5 text-white '>Workspace</h2>
      </div>
    <div className='flex gap-4 items-center justify-center mt-6'>
        {
          canvasSizeOptions.map((option) => (
            <div
              key={option.name}
              className='flex flex-col items-center cursor-pointer'
              onClick={() => OnCanvasOptionSelect(option)}
            >
              <Image src={option.icon} alt={option.name} width={60} height={60} className='hover:scale-105 transition-all'/>
              <h2 className='text-xs mt-2 font-medium'>{option.name}</h2>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default IntroOptions