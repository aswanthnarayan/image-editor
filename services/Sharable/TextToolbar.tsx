import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

const TextToolbar = ({ item }: { item: any }) => {
    return (
        <>
            <Popover key={item.name}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={item.name}
                        className="w-8 h-8 p-0 hover:text-black hover:bg-gray-100 active:bg-gray-200"
                    >
                        <item.icon strokeWidth={2.2} className="w-4 h-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    {item.component}
                </PopoverContent>
            </Popover>
        </>
    )
}

export default TextToolbar