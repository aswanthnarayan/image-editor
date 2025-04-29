import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const TextToolbar = ({ item }: { item: any }) => {
    return (
        <>
            <Popover key={item.name}>
                <PopoverTrigger asChild>
                    <div className="w-8 h-8 p-0 flex items-center justify-center rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors">
                        <item.icon />
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    {item.component}
                </PopoverContent>
            </Popover>
        </>
    )
}

export default TextToolbar