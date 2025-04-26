import Image from 'next/image'
import React from 'react'
import PreTemplates from '../_components/PreTemplates'

const Templates = () => {
    return (
        <div className='p-10 w-full'>
             <div className='relative'>
                    <Image src="/banner-home.png" alt="banner" width={1800} height={300} className="w-full h-[150px] object-cover rounded-xl" priority />
                <h2 className='text-2xl font-bold absolute bottom-5 left-5 text-white '>Templates</h2>
                  </div>
                  <PreTemplates/>
        </div>
      )
}

export default Templates