
"use client";
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@stackframe/stack'
import { useDesign } from '@/context/DesignContext'
import { Button } from '@/components/ui/button';
import { Save, Download } from 'lucide-react';
import { useCanvasHook } from '@/context/CanvasContext';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { toast } from "sonner";
import ImageKit from 'imagekit';

const DesignHeader = () => {
  var imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
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

  return (
    <div className="flex items-center justify-between px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md w-full ">
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
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          value={design?.name || ''}
          readOnly
          className="text-center text-lg font-semibold bg-transparent"
        />
      </div>
      <div className='flex gap-5'>
        <Button onClick={onSave}><Save/>Save</Button>
        <Button onClick={onDownload}><Download/>Download</Button>
        <UserButton/>
      </div>
    </div>
  )
}

export default DesignHeader