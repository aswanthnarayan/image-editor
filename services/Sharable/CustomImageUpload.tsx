import { Button } from '@/components/ui/button';
import { useCanvasHook } from '@/context/CanvasContext';
import { FabricImage } from 'fabric';
import ImageKit from 'imagekit-javascript';
import { ImageUp, Loader2Icon, AlertTriangle } from 'lucide-react'
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useState } from 'react'

import { AITransformationSettings } from '../Options';
import { toast } from 'sonner';

// Allowed file types and their maximum sizes
const ALLOWED_FILE_TYPES = [
  'image/jpeg', 
  'image/png', 
  'image/webp', 
  'image/gif'
];
const MAX_FILE_SIZE_MB = 10; // 10 MB file size limit

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
  });

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError(`Unsupported file type. Allowed types: ${ALLOWED_FILE_TYPES.map(type => type.split('/')[1]).join(', ')}`);
     toast.error(`Unsupported file type. Allowed types: ${ALLOWED_FILE_TYPES.map(type => type.split('/')[1]).join(', ')}`);
      return false;
    }

    // Check file size (in bytes)
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      setError(`File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB`);
      toast.error(`File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB`);
      return false;
    }

    return true;
  };

  const imageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !designId) return;

    // Reset previous errors
    setError(null);

    // Validate file
    if (!validateFile(file)) {
      return;
    }

    setLoading(true);

    try {
      // Fetch signature from backend
      const res = await fetch('/api/imagekit-auth');
      const auth = await res.json();

      imagekit.upload({
        file,
        fileName: (typeof designId === 'string' ? designId : designId) + `.${file.type.split('/')[1]}`,
        signature: auth.signature,
        token: auth.token,
        expire: auth.expire,
      }, (err: any, result: any) => {
        setLoading(false);
        if (err) {
          setError('Image upload failed. Please try again.');
          setHasAppliedAI(false);
          return;
        }
        setImage(result.url);
        setHasAppliedAI(false);
      });
    } catch (uploadError) {
      setLoading(false);
      toast.error('Upload failed. Please check your connection.');
      setError('Upload failed. Please check your connection.');
    }
  };

  const onAddtoCanvas = async() => {
    if (!image) {
      toast.error('No image to add');
      setError('No image to add');
      return;
    }

    setLoading(true);
    try {
      const canvasImageRef = await FabricImage.fromURL(
        image,
        {
          crossOrigin: 'anonymous'
        }
      );
      canvasEditor?.add(canvasImageRef);
      setImage('');
      setSelectedAI(null);
    } catch (addError) {
      setError('Failed to add image to canvas');
    } finally {
      setLoading(false);
    }
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
        setHasAppliedAI(true);
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
        <label 
          htmlFor='uploadImage' 
          className='bg-secondary p-4 flex items-center justify-center rounded-xl h-[150px] mb-2 cursor-pointer'
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center w-full">
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
          <Image 
            src={image} 
            height={300} 
            width={300} 
            alt="Uploaded" 
            className='w-full h-[150px] object-cover rounded-xl' 
            unoptimized 
          />
          {hasAppliedAI && (
            <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow">
              AI Applied
            </span>
          )}
          {error && (
            <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow flex items-center">
              <AlertTriangle className="mr-1 w-3 h-3" />
              {error}
            </div>
          )}
        </div>
      )}
      <input 
        type="file" 
        id="uploadImage" 
        className="hidden" 
        onChange={imageUpload} 
        accept={ALLOWED_FILE_TYPES.join(',')}
      />
      <Button 
        onClick={onAddtoCanvas} 
        className='w-full cursor-pointer' 
        disabled={!image || loading}
      >
        {loading ? <Loader2Icon className='animate-spin'/> : 'Add to Canvas'}
      </Button>
    </div>
  );
}

export default CustomImageUpload;