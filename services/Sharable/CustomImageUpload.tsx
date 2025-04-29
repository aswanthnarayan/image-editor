import { Button } from '@/components/ui/button';
import { useCanvasHook } from '@/context/CanvasContext';
import { FabricImage } from 'fabric';
import ImageKit from 'imagekit-javascript';
// ^ Use browser SDK, not Node.js SDK
import { ImageUp, Loader2Icon } from 'lucide-react'
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useState } from 'react'


import { AITransformationSettings } from '../Options';

interface CustomImageUploadProps {
  selectedAI: typeof AITransformationSettings[0] | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAI: React.Dispatch<React.SetStateAction<typeof AITransformationSettings[0] | null>>;
}

const CustomImageUpload = ({ selectedAI, loading, setLoading, setSelectedAI }: CustomImageUploadProps) => {
  const {canvasEditor} = useCanvasHook();
  const designId = (useParams() as { [key: string]: string }).designId;
  const [image, setImage] = useState('');
  const [hasAppliedAI, setHasAppliedAI] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ''
    // No privateKey on frontend!
  });

  const imageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !designId) return;
    setLoading(true); // Start loading

    // Fetch signature from backend
    const res = await fetch('/api/imagekit-auth');
    const auth = await res.json();

    imagekit.upload({
      file,
      fileName: (typeof designId === 'string' ? designId : designId) + '.png',
      signature: auth.signature,
      token: auth.token,
      expire: auth.expire,
    }, (err: any, result: any) => {
      setLoading(false); // Always stop loading
      if (err) {
        setError('Image upload failed. Please try again.');
        setHasAppliedAI(false);
        return;
      }
      setImage(result.url);
      setHasAppliedAI(false); // reset AI applied status on new upload
      setError(null);
    });
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
        setImage('');
    setSelectedAI(null); // Reset AI selection after adding to canvas
    setLoading(false);
  }
  useEffect(() => {
    if (selectedAI && image) {
      try {
        let imageUrl = image;
        if (imageUrl.includes('?tr=')) {
          imageUrl = imageUrl + ',' + selectedAI.command;
        } else {
          imageUrl = imageUrl + '?tr=' + selectedAI.command;
        }
        setImage(imageUrl);
        setHasAppliedAI(true); // Mark as applied
        setError(null);
      } catch (e) {
        setError('Failed to apply AI transformation.');
        setHasAppliedAI(false);
      }
    }
  }, [selectedAI]);

  return (
    <div className='mb-4'>
    {!image ? (
  <label htmlFor='uploadImage' className='bg-secondary p-4 flex items-center justify-center rounded-xl h-[150px] mb-2 cursor-pointer'>
    {loading ? (
      <div className="flex flex-col items-center justify-center w-full">
        {/* Animated SVG Cloud Upload */}
        <svg className="w-12 h-12 animate-bounce mb-2 text-blue-500" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 32l8-8 8 8M24 24v12" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M36 36H12a8 8 0 010-16h1.26A12.94 12.94 0 0124 8c4.41 0 8.36 2.19 10.74 5.6A8 8 0 0136 36z" />
        </svg>
        <span className="text-blue-600 font-semibold animate-pulse">Uploading...</span>
      </div>
    ) : (
      <ImageUp />
    )}
    <h2 className='text-xs'>{!loading && 'Upload Image'}</h2>
  </label>
) : (
  <div className='relative w-full mb-4'>
    <Image src={image} height={300} width={300} alt="Uploaded" className='w-full h-[150px] object-cover rounded-xl' unoptimized />
    {hasAppliedAI && (
      <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow">AI Applied</span>
    )}
    {error && (
      <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow">{error}</span>
    )}
  </div>
)}
      <input type="file" id="uploadImage" className="hidden" onChange={imageUpload} />
      <Button onClick={onAddtoCanvas} className='w-full cursor-pointer'>{loading ?<Loader2Icon className='animate-spin'/> : 'Add to Canvas'}</Button>
</div>
  );
}


export default CustomImageUpload