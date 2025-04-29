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
  const [isSaving, setIsSaving] = React.useState(false);
  var imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ''
})
  const design = useDesign();

  const {canvasEditor} = useCanvasHook();
  const saveDesign = useMutation(api.design.saveDesign);
  const designId = (useParams() as { [key: string]: string }).designId;
  const onSave = async ()=>{
  setIsSaving(true);

        const savingToastId = toast.loading("Saving design...");
        const base64Image = canvasEditor?.toDataURL({
          format: 'png',
          quality: 0.5,
          multiplier: 1
        });
        if (!base64Image) {
          toast.error("Failed to generate image preview.");
          toast.dismiss(savingToastId);
    setIsSaving(false);
          return;
        }
        // Define FileObject for type safety
        interface FileObject {
          type: "file";
          fileId: string;
          [key: string]: any;
        }
        // Type guard for file objects
        function isFileObject(item: any): item is FileObject {
          return item.type === "file" && typeof item.fileId === "string";
        }
        //Get List of images/files
        const existingFiles: (FileObject | { type: string; [key: string]: any })[] = await imagekit.listFiles({
          searchQuery: 'name='+designId+'.png'
        });
        const file = existingFiles.find(isFileObject);
        if (file) {
          imagekit.deleteFile(file.fileId);
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
              id: Id<"designs">(designId),
              jsonDesign,
              imagePreview: imageRef?.url+ '?t=' + Date.now()
            });
        toast.success("Design saved successfully!");
      } catch {
        toast.error("Failed to save design.");
      } finally {
        toast.dismiss(savingToastId);
        setIsSaving(false);
      }
    }
    else{
      toast.error("Failed to save design.");
      toast.dismiss(savingToastId);
      setIsSaving(false);
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
                disabled={isSaving}
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
        {user && user.id && <UserButton />}
      </div>
    </div>
  )
}

export default DesignHeader

function Id<T extends string>(id: string): import("convex/values").GenericId<T> {
  return id as import("convex/values").GenericId<T>;
}
