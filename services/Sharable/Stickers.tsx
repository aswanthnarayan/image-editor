import React, { useState } from 'react';
import { StickerList } from '../Options';
import { useCanvasHook } from '@/context/CanvasContext';
import { FabricImage } from 'fabric';

const Stickers = () => {
  const { canvasEditor } = useCanvasHook();
  const [stickerUrl, setStickerUrl] = useState('');

  const onAddSticker = async (url: string) => {
    if (!canvasEditor) return;
    const canvasImageRef = await FabricImage.fromURL(url)
    canvasImageRef.set({
        left: 100, 
        top: 100,   
        scaleX: 0.4,
        scaleY: 0.4,
      });
    canvasEditor?.add(canvasImageRef)
    canvasEditor?.renderAll()
  };

  return (
    <div className="my-4">
      <h3 className="font-semibold text-sm mb-2">Stickers</h3>
      <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
        {StickerList.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt="sticker"
            className="w-12 h-12 object-contain cursor-pointer border rounded hover:shadow-md transition"
            onClick={() => onAddSticker(url)}
          />
        ))}
      </div>
    </div>
  );
};

export default Stickers;