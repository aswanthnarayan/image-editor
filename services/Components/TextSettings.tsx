import React from 'react'
import { useCanvasHook } from '@/context/CanvasContext'
import { IText } from 'fabric';

const TextSettings = () => {
    const {canvasEditor} = useCanvasHook();
    const onAddTextClick = (type: string) => {
        if(canvasEditor){
            if(type=='heading'){
                const textRef = new IText('Heading', {
                    fontSize: 34,
                    fontWeight: 'bold',
                    fontFamily:"Arial",
                    fill: '#000',
                    left: 100,
                    top: 100
                })
                canvasEditor.add(textRef);
                canvasEditor.setActiveObject(textRef);
                canvasEditor.renderAll();
            }
            if(type=='subheading'){
                const textRef = new IText('SubHeading', {
                    fontSize: 24,
                    fontWeight: 'bold',
                    fontFamily:"Arial",
                    fill: '#000',
                    left: 100,
                    top: 100
                })
                canvasEditor.add(textRef);
                canvasEditor.setActiveObject(textRef);
                canvasEditor.renderAll();
            }
            if(type=='paragraph'){
                const textRef = new IText('Paragraph', {
                    fontSize: 16,
                    fontWeight: 'normal',
                    fontFamily:"Arial",
                    fill: '#000',
                    left: 100,
                    top: 100
                })
                canvasEditor.add(textRef);
                canvasEditor.setActiveObject(textRef);
                canvasEditor.renderAll();
            }
        }
    }
  return (
    <div className='flex flex-col gap-3'>
        <h2 onClick={() => onAddTextClick('heading')}
        className='text-2xl rounded-xl font-bold bg-secondary p-3'>Add Heading</h2>
        <h2 onClick={() => onAddTextClick('subheading')}
        className='text-xl rounded-xl font-medium bg-secondary p-3'>Add SubHeading</h2>
        <h2 onClick={() => onAddTextClick('paragraph')}
        className='text-md rounded-xl  bg-secondary p-3'>Add Paragraph</h2>
    </div>
  )
}

export default TextSettings