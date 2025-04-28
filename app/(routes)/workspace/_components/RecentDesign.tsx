"use client"
import { Button} from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import CustomCanvasDialog from './CustomCanvasDialog'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useRouter } from 'next/navigation'
import { SkeletonCard } from '@/components/ui/SkeltonCard'
import Image from 'next/image'
import { FullScreenLoader } from '@/components/ui/FullScreenLoader'

interface RecentDesignProps {
  title?: string;
  limit?: number;
}

const RecentDesign = ({ title = "Recent Design", limit }: RecentDesignProps) => {
    const [designList,setDesignList] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [navLoading, setNavLoading] = useState(false);
    const {userDetail} = useContext(UserDetailContext)
    const convex = useConvex()
  const router = useRouter();
  useEffect(() => {
    if (userDetail?._id) {
      getRecentDesign();
    }
  }, [userDetail]);

  const getRecentDesign = async () => {
    setIsLoading(true);
    const result = await convex.query(api.design.GetAllDesignByUser, {
          uid: userDetail?._id
    });
    setDesignList(Array.isArray(result) && limit ? result.slice(0, limit) : result);
    setIsLoading(false);

  };
    return (
    <div className='mt-7'>
      {navLoading && <FullScreenLoader />}
      <h2 className='text-lg font-bold'>Recent Design</h2>
   {
    designList?.length==0?
    <div className='flex flex-col gap-4 items-center '>
        <Image src={'/edittool.png'} alt="edit" width={100} height={100} className="" />
        <h2 className="text-center">You dont have any design created yet</h2>
    <CustomCanvasDialog><Button>+ Create New</Button></CustomCanvasDialog>
   </div>
   :
   <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5'>
  {isLoading
    ? Array.from({ length: limit }).map((_, i) => (
        
        <SkeletonCard key={i}  className='w-full h-[200px] object-cover rounded-lg'/>
      ))
    : designList?.map((design) => (
        <div
          onClick={() => {
            setNavLoading(true);
            setTimeout(() => {
              router.push(`/design/${design?._id}`);
            }, 150);
          }}
          key={design._id}
          className="relative group"
        >
          <Image
            src={design?.imagePreview}
            alt={design?.name}
            width={500}
            height={200}
            className="w-full h-[200px] object-cover rounded-lg cursor-pointer transition-all duration-300 group-hover:blur-[3px] group-hover:brightness-90"
          />
          {/* Overlay shown on hover */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-md font-semibold text-white">
              Click to open in canvas
            </span>
          </div>
          <div className="mt-2 text-center font-bold text-gray-700 truncate">
            {design?.name}
          </div>
        </div>
      ))}
</div>
  }
    </div>
  )
}

export default RecentDesign