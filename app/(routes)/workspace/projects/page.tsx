import Image from 'next/image'
import React from 'react'
import RecentDesign from '../_components/RecentDesign'

const Projects = () => {
  return (
    <div className='p-10 w-full'>
         <div className='relative'>
                <Image src="/banner.png" alt="banner" width={1800} height={300} className="w-full h-[150px] object-cover rounded-xl" priority />
            <h2 className='text-2xl font-bold absolute bottom-5 left-5 text-white '>Projects</h2>
              </div>
              <RecentDesign title="Your Projects" limit={undefined}/>
    </div>
  )
}

export default Projects