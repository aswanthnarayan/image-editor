import { Button } from '@/components/ui/button';
import { useCanvasHook } from '@/context/CanvasContext';
import { FabricImage } from 'fabric';
import ImageKit from 'imagekit';
import { ImageUp, Loader2Icon } from 'lucide-react'
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useState } from 'react'


interface CustomImageUploadProps {
  selectedAI: { command: string } | null;
}

const CustomImageUpload = ({ selectedAI }: CustomImageUploadProps) => {
  const {canvasEditor} = useCanvasHook();
  const {designId} = useParams();
  const[image,setImage]= useState('')
  const [loading,setLoading] = useState(false)

  var imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
})

  const imageUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
   const imageRef = await imagekit.upload({
    file: file,
    fileName: designId!.designId+'.png',
    isPublished:true
  })
   const imageUrl = URL.createObjectURL(file);
   setImage(imageRef?.url);
  };

  const onAddtoCanvas = async() => {
    setLoading(true);
    const canvasImageRef =await FabricImage.fromURL(
          image,
          {
            crossOrigin: 'anonymous'
          }
        )
        canvasEditor?.add(canvasImageRef)
        setImage('')
        setLoading(false);
  }
  useEffect(() => {
    if (selectedAI && image) {
      let imageUrl = image;
      if (imageUrl.includes('?tr=')) {
        imageUrl = imageUrl + ',' + selectedAI.command;
      } else {
        imageUrl = imageUrl + '?tr=' + selectedAI.command;
      }
      setImage(imageUrl);
    }
  }, [selectedAI]);

  return (
    <div className='mb-4'>
    {!image ?
      
        <label htmlFor= 'uploadImage' className='bg-secondary p-4 flex items-center justify-center rounded-xl h-[150px] mb-2 cursor-pointer'>
          <ImageUp/>
          <h2 className='text-xs'>Upload Image</h2>
        </label>
        :
        <Image src={image} height={300} width={300} alt="Uploaded" className='w-full h-[150px] object-cover rounded-xl mb-4' unoptimized />
      }
      <input type="file" id="uploadImage" className="hidden" onChange={imageUpload} />
      <Button onClick={onAddtoCanvas} className='w-full cursor-pointer'>{loading ?<Loader2Icon className='animate-spin'/>:'Add to Canvas'}</Button>
</div>
  );
}


export default CustomImageUpload