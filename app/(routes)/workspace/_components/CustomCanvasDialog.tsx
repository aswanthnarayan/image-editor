import React, { useContext, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FullScreenLoader } from '@/components/ui/FullScreenLoader';

const CustomCanvasDialog = ({children}: {children: React.ReactNode}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [loading, setLoading] = useState(false);
    const { userDetail } = useContext(UserDetailContext);
    const createDesignRecord = useMutation(api.design.CreateNewDesign);
    const router = useRouter();

    const onCreate = async () => {
        toast("Creating new design...") 
        setLoading(true);
        const result = await createDesignRecord({
          name: name,
          width: width,
          height: height,
          uid: userDetail?._id
        })
        toast("Design created successfully");
        setOpen(false); 
        setTimeout(() => {
            router.push(`/design/${result}`);
          }, 300); 
    }

    return (
        <>
        {loading && <FullScreenLoader/>}
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Custom Canvas</DialogTitle>
                    <div>
                        <div>
                            <h2 className="font-medium mb-4">Provide Canvas Dimensions</h2>
                            <div className="mb-4">
                                <label className="block mb-1">Design Name</label>
                                <input onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" placeholder="Design Name" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary" />
                            </div>
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="block mb-1">Width</label>
                                    <input onChange={(e) => setWidth(Number(e.target.value))} type="number" id="width" name="width" placeholder="Width" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary" />
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-1">Height</label>
                                    <input onChange={(e) => setHeight(Number(e.target.value))} type="number" id="height" name="height" placeholder="Height" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-primary" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button
                                disabled={loading||!name||!width||!height}
                                onClick={onCreate}
                                className="w-full"
                                type="submit"
                            >
                                {loading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : 'Create'}
                            </Button>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default CustomCanvasDialog