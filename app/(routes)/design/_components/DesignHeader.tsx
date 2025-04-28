"use client";
import React from 'react'
import Image from 'next/image'
import { Save, Download } from 'lucide-react'
import { UserButton, useUser } from '@stackframe/stack'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useDesign } from '@/context/DesignContext'
import { useCanvasHook } from '@/context/CanvasContext';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from "sonner";
import ImageKit from 'imagekit';

const DesignHeader = () => {
  var imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ''
})
  const design = useDesign();

  const {canvasEditor} = useCanvasHook();
  const saveDesign = useMutation(api.design.saveDesign);
  const {designId} = useParams();  
  const onSave = async ()=>{
        const base64Image = canvasEditor?.toDataURL({
          format: 'png',
          quality: 0.5,
          multiplier: 1
        })
        //Get List of images/files
        const existingFiles = await imagekit.listFiles({
          searchQuery: 'name='+designId+'.png'
        })

        //Delete existing file
        if (existingFiles?.data?.files?.length) {
          await imagekit.deleteFile({
            fileId: existingFiles.data.files[0].fileId
          })
        }

        const imageRef = await imagekit.upload({
          file: base64Image,
          fileName: designId+'.png',
          isPublished:true,
          useUniqueFileName: false
        })

        if(canvasEditor && designId){
          const jsonDesign = canvasEditor.toJSON();
          try {
            await saveDesign({
              id: designId,
              jsonDesign,
              imagePreview: imageRef?.url
            });
        toast.success("Design saved successfully!");
      } catch {
        toast.error("Failed to save design.");
      }
    }
  }
  const onDownload = async () => {
    const dataUrl = canvasEditor?.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1
    })
    if (dataUrl) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${design?.name+'Pixia' || 'Pixia'}.png`;
      link.click();
    }
  };

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
    <div className="flex items-center justify-between px-6 bg-gradient-to-r from-violet-100 via-indigo-100 to-pink-50 shadow-md w-full ">
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
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          value={design?.name || ''}
          readOnly
          className="text-center text-lg font-semibold bg-transparent"
        />
      </div>
      <div className="flex gap-3 items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild className='bg-white/80'>
              <Button
                onClick={onSave}
                size="icon"
                variant="ghost"
                className="rounded-full bg-white/80 hover:bg-violet-100 text-violet-600 hover:text-black shadow transition-all"
                aria-label="Save Design"
              >
                <Save className="w-5 h-5 transition-colors" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onDownload}
                size="icon"
                variant="ghost"
                className="rounded-full bg-white/80 hover:bg-blue-100 text-blue-600 hover:text-black shadow transition-all"
                aria-label="Download Design"
              >
                <Download className="w-5 h-5 transition-colors" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <UserButton />
      </div>
    </div>
  )
}

export default DesignHeader