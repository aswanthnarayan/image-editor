import { Button } from '@/components/ui/button'
import React, { useRef, useState } from 'react'
import ImageKit from 'imagekit-javascript'
import { useParams } from 'next/navigation'
import { Loader2Icon, AlertTriangle } from 'lucide-react'
import { FabricImage } from 'fabric'
import { useCanvasHook } from '@/context/CanvasContext'
import { toast } from 'sonner'

// Allowed file types and their maximum sizes
const ALLOWED_FILE_TYPES = [
  'image/jpeg', 
  'image/png', 
  'image/webp', 
  'image/gif'
];
const MAX_FILE_SIZE_MB = 10; // 10 MB file size limit

const UploadImage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const designId = (useParams() as { [key: string]: string }).designId;
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {canvasEditor} = useCanvasHook();
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

  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !designId) return;

    // Reset previous errors
    setError(null);

    // Validate file
    if (!validateFile(file)) {
      toast.error('Invalid file type or size');
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
      }, async (err: any, result: any) => {
        setLoading(false);
        if (err) {
          toast.error('Image upload failed. Please try again.');
          return;
        }
        
        try {
          const canvasImageRef = await FabricImage.fromURL(
            result.url,
            {
              crossOrigin: 'anonymous'
            }
          );
          canvasEditor?.add(canvasImageRef);
          canvasEditor?.renderAll();
        } catch (addError) {
          setError('Failed to add image to canvas');
          toast.error('Failed to add image to canvas');
        }
      });
    } catch (uploadError) {
      setLoading(false);
      toast.error('Upload failed. Please check your connection.');
      setError('Upload failed. Please check your connection.');
    }
  }

  return (
    <div>
      <Button
        onClick={onButtonClick}
        className="relative flex items-center justify-center px-4 cursor-pointer"
        disabled={loading}
      >
        {loading && (
          <Loader2Icon className="animate-spin absolute inset-0 m-auto w-4 h-4" />
        )}
        <span className={loading ? 'invisible' : ''}>Upload Image</span>
      </Button>
      {error && (
        <div className="text-red-500 text-xs mt-2 flex items-center">
          <AlertTriangle className="mr-1 w-3 h-3" />
          {error}
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={onFileChange}
        accept={ALLOWED_FILE_TYPES.join(',')}
      />
    </div>
  )
}

export default UploadImage