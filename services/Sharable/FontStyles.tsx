import { Toggle } from '@/components/ui/toggle'
import { Bold, Italic, Underline } from 'lucide-react'
import React from 'react'
import { useCanvasHook } from '@/context/CanvasContext'
import fabric from 'fabric';

const isTextObject = (obj: any): obj is fabric.Textbox | fabric.IText | fabric.Text => {
    return obj && 'fontWeight' in obj && 'fontStyle' in obj && 'underline' in obj;
};

const FontStyles = () => {
    const { canvasEditor } = useCanvasHook();
    const onFontStyleChange = (style: string) => {
        const activeObject = canvasEditor?.getActiveObject();
        if (activeObject && isTextObject(activeObject)) {
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
                    underline: !!activeObject.underline ? false : true
                });
            }
            canvasEditor?.requestRenderAll();
        }
    }
  return (
    <div>
        <Toggle aria-label="Toggle-Bold" onClick={() => onFontStyleChange('bold')}
        defaultPressed={(() => {
          const obj = canvasEditor?.getActiveObject();
          return obj && isTextObject(obj) ? obj.fontWeight === 'bold' : false;
        })()} >
            <Bold className='h-4 w-4' size={'lg'}/>
        </Toggle>
        <Toggle aria-label="Toggle-Italic" onClick={() => onFontStyleChange('italic')} 
            defaultPressed={(() => {
              const obj = canvasEditor?.getActiveObject();
              return obj && isTextObject(obj) ? obj.fontStyle === 'italic' : false;
            })()}>
            <Italic className='h-4 w-4' size={'lg'}/>
        </Toggle>
        <Toggle aria-label="Toggle-Underline" onClick={() => onFontStyleChange('underline')} 
            defaultPressed={(() => {
              const obj = canvasEditor?.getActiveObject();
              return obj && isTextObject(obj) ? !!obj.underline : false;
            })()}>
            <Underline className='h-4 w-4' size={'lg'}/>
        </Toggle>
    </div>
  )
}

export default FontStyles