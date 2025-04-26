import React from 'react'
import IntroOptions from './_components/IntroOptions'
import RecentDesign from './_components/RecentDesign'
import { SkeletonCard } from '@/components/ui/SkeltonCard'

const Workspace = () => {
  return (
    <div className='w-full h-full p-4'>
      <IntroOptions/>
      <RecentDesign title="Recent Design" limit={5}/>
      <SkeletonCard className="w-full h-[200px] object-cover rounded-lg"/>
    </div>
  )
}

export default Workspace