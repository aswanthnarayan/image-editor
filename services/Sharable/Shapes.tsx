import React from 'react'
import { ShapeList } from '../Options'
import Image from 'next/image'
import { Circle, Line,Rect,Triangle } from 'fabric'
import { useCanvasHook } from '@/context/CanvasContext'

const Shapes = () => {
    const {canvasEditor} = useCanvasHook();
    const properties = {
        left: 100,
        top: 100,
        radius: 50,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2,
        height:100,
        width:100
    } 
    const onShapeSelect = (shape: any) => {
        if(shape.name === 'Circle') {
            const circleRef = new Circle({
                ...properties
            })
            canvasEditor?.add(circleRef)
            canvasEditor?.renderAll()
        }
        else if(shape.name === 'Square') {
            const squareRef = new Rect({
                ...properties
            })
            canvasEditor?.add(squareRef)
            canvasEditor?.renderAll()
        }
        else if(shape.name === 'Trangle') {
            const triangleRef = new Triangle({
             ...properties
            })
            canvasEditor?.add(triangleRef)
            canvasEditor?.renderAll()
        }
        else if(shape.name === 'Line') {
            const lineRef = new Line([50, 100, 200, 200], {
                left: 170,
                top: 150,
                stroke: 'black'
            })
            canvasEditor?.add(lineRef)
            canvasEditor?.renderAll()
        }
    }
  return (
    <div className='grid grid-cols-2 gap-3'>
        {
            ShapeList.map((shape) => (
                <div key={shape.name} className='cursor-pointer p2 border rounded-xl' onClick={() => onShapeSelect(shape)}>
                    <Image src={shape.icon} alt={shape.name} height={100} width={100} className='w-full h-full' />
                </div>
            ))
        }
    </div>
  )
}

export default Shapes