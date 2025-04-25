import { Toggle } from '@/components/ui/toggle'
import { Bold, Italic, Underline } from 'lucide-react'
import React from 'react'
import { useCanvasHook } from '@/context/CanvasContext'

const FontStyles = () => {
    const { canvasEditor } = useCanvasHook();
    const onFontStyleChange = (style: string) => {
        const activeObject = canvasEditor?.getActiveObject();
        if (activeObject) {
            if (style === 'bold') {
                activeObject.set({
                    fontWeight: activeObject.fontWeight === 'bold' ? 'normal' : 'bold'
                });
            } else if (style === 'italic') {
                activeObject.set({
                    fontStyle: activeObject.fontStyle === 'italic' ? 'normal' : 'italic'
                });
            } else if (style === 'underline') {
                activeObject.set({
                    underline: activeObject.underline === true ? null : true
                });
            }
            canvasEditor?.requestRenderAll();
        }
    }
  return (
    <div>
        <Toggle aria-label="Toggle-Bold" onClick={() => onFontStyleChange('bold')}
        defaultPressed={canvasEditor?.getActiveObject()?.fontWeight === 'bold'} >
            <Bold className='h-4 w-4' size={'lg'}/>
        </Toggle>
        <Toggle aria-label="Toggle-Italic" onClick={() => onFontStyleChange('italic')} 
            defaultPressed={canvasEditor?.getActiveObject()?.fontStyle === 'italic'}>
            <Italic className='h-4 w-4' size={'lg'}/>
        </Toggle>
        <Toggle aria-label="Toggle-Underline" onClick={() => onFontStyleChange('underline')} 
            defaultPressed={canvasEditor?.getActiveObject()?.underline}>
            <Underline className='h-4 w-4' size={'lg'}/>
        </Toggle>
    </div>
  )
}

export default FontStyles