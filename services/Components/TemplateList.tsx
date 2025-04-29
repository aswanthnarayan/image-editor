import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '@/convex/_generated/api'
import Image from 'next/image'
import { useCanvasHook } from '@/context/CanvasContext'
import { toast } from 'sonner'
import { SkeletonCard } from '@/components/ui/SkeltonCard';

const TemplateList = () => {
    const {canvasEditor} = useCanvasHook()
    const templateList = useQuery(api.template.GetAllTemplates,{})

    const onTemplateSelect = (template: any) => {
        if (canvasEditor && template.jsonData) {
            canvasEditor.loadFromJSON(template.jsonData, () => {
                canvasEditor.requestRenderAll();
            });
        } else {
            toast.error("This template has no design data!");
        }
    }

  return (
    <div>
      <div className='grid grid-cols-2 gap-4'>
        {templateList === undefined
          ? Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} className="w-full h-[200px] rounded-xl" />
            ))
          : templateList.map((template) => (
              <div onClick={() => onTemplateSelect(template)}
                key={template._id} className="bg-white/80 rounded-xl shadow p-2 flex flex-col items-center">
                <Image 
                  src={template.imagePreview} 
                  alt={template.name} 
                  width={500} 
                  height={500} 
              className="object-contain h-[150px] w-full rounded-lg bg-gray-100"/>
            <div className="mt-2 text-sm font-semibold text-gray-700 text-center w-full truncate">
              {template.name}
            </div>
          </div>
        ))}
       </div> 
    </div>
  )
}

export default TemplateList