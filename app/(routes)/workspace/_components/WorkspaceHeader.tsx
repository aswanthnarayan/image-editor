"use client";
import React from 'react'
import Image from 'next/image'
import { UserButton, useUser } from '@stackframe/stack'
import { useRouter } from 'next/navigation'

const WorkspaceHeader = () => {
  const router = useRouter();
  const user = useUser();

  const handleLogoClick = () => {
    if (user && user.primaryEmailVerified) {
      router.push('/workspace');
    } else if (user && !user.primaryEmailVerified) {
      router.push('/?verifyEmail=1');
    } else {
      router.push('/handler/signin');
    }
  };

  return (
    <div className="flex items-center justify-between px-6 bg-white shadow-md w-full">
      <div className="flex items-center">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={100} 
          height={70} 
          className="object-contain w-[100px] h-[70px] cursor-pointer" 
          priority
          onClick={handleLogoClick}
        />
      </div>
      <UserButton/>
    </div>
  )
}

export default WorkspaceHeader