import React from 'react'
import Image from 'next/image'
import { UserButton } from '@stackframe/stack'

const WorkspaceHeader = () => {
  return (
    <div className="flex items-center justify-between px-6  bg-white shadow-md w-full">
      <div className="flex items-center">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={100} 
          height={70} 
          className="object-contain w-[100px] h-[70px]" 
          priority
        />
      </div>
        <UserButton/>
      </div>
  )
}

export default WorkspaceHeader