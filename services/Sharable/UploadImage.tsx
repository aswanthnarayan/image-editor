import { Button } from '@/components/ui/button'
import React, { useRef, useState } from 'react'
import ImageKit from 'imagekit'
import { useParams } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'
import { FabricImage } from 'fabric'
import { useCanvasHook } from '@/context/CanvasContext'

const UploadImage = () => {
  const [loading, setLoading] = useState(false)
  const designId = useParams()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {canvasEditor} = useCanvasHook();
  var imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
})
  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    const imageRef = await imagekit.upload({
      file: file,
      fileName: designId!.designId+'.png',
      isPublished:true
    })
    setLoading(false)
    const canvasImageRef =await FabricImage.fromURL(
      imageRef?.url,
      {
        crossOrigin: 'anonymous'
      }
    )
    canvasEditor?.add(canvasImageRef)
    canvasEditor?.renderAll()
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