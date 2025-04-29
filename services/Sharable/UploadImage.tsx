import { Button } from '@/components/ui/button'
import React, { useRef, useState } from 'react'
import ImageKit from 'imagekit-javascript'
import { useParams } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'
import { FabricImage } from 'fabric'
import { useCanvasHook } from '@/context/CanvasContext'

const UploadImage = () => {
  const [loading, setLoading] = useState(false)
  const designId = (useParams() as { [key: string]: string }).designId;
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {canvasEditor} = useCanvasHook();
  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ''
    
    // No privateKey on frontend!
  });
  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !designId) return;
    setLoading(true);

    // Fetch signature from backend
    const res = await fetch('/api/imagekit-auth');
    const auth = await res.json();

    imagekit.upload({
      file,
      fileName: designId + '.png',
      signature: auth.signature,
      token: auth.token,
      expire: auth.expire,
    }, async (err:any, result:any) => {
      setLoading(false);
      if (err) {
        // handle error (show toast or log)
        return;
      }
      const canvasImageRef = await FabricImage.fromURL(
        result.url,
        {
          crossOrigin: 'anonymous'
        }
      );
      canvasEditor?.add(canvasImageRef);
      canvasEditor?.renderAll();
    });
  }

  return (
    <div>
      <Button
        onClick={onButtonClick}
        className="relative flex items-center justify-center px-4 cursor-pointer"
      >
        {loading && (
          <Loader2Icon className="animate-spin absolute inset-0 m-auto w-4 h-4" />
        )}
        <span className={loading ? 'invisible' : ''}>Upload Image</span>
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={onFileChange}
        accept="image/*"
      />
    </div>
  )
}

export default UploadImage