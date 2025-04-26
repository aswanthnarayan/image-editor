
"use client"
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React, { useContext } from 'react'
import CustomCanvasDialog from './CustomCanvasDialog'
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useRouter } from 'next/navigation'

const PreTemplates = () => {
    const templateList = useQuery(api.template.GetAllTemplates)
    const CreateDesignFromTemplate = useMutation(api.design.CreateDesignFromTemplate)
    const {userDetail} =useContext(UserDetailContext)
    const router = useRouter()
    const onTemplateSelect = async (template: any) => {
        const id = await CreateDesignFromTemplate({
            name: template.name,
            imagePreview: template?.imagePreview,
            jsonTemplate: template?.jsonData, 
            height: template?.height ?? 500,  
            width: template?.width ?? 500,
            uid: userDetail?._id
        });
        router.push(`/design/${id}`);
    };
    return (
        <>
        <div className='mt-7'>
            <h2 className='text-lg font-bold'>Templates</h2>
            {
                templateList?.length == 0 ?
                    <div className='flex flex-col gap-4 items-center '>
                        <Image src={'/edittool.png'} alt="edit" width={100} height={100} className="" />
                        <h2 className="text-center">You dont have any design created yet</h2>
                        <CustomCanvasDialog><Button>+ Create New</Button></CustomCanvasDialog>
                    </div>
                    :
                    <div
                        className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5'>
                        {
                            templateList?.map((template) => (
                                <div onClick={() => onTemplateSelect(template)}
                                    key={template._id}>
                                    <Image src={template?.imagePreview} alt={template?.name} width={500} height={500} className="w-full h-[200px] object-cover rounded-lg" />
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
        </>
    )
}

export default PreTemplates