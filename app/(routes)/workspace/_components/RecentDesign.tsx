"use client"
import { Button} from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import CustomCanvasDialog from './CustomCanvasDialog'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useRouter } from 'next/navigation'
import { SkeletonCard } from '@/components/ui/SkeltonCard'
import Image from 'next/image'
import { FullScreenLoader } from '@/components/ui/FullScreenLoader'
import { Id } from '@/convex/_generated/dataModel'
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DeleteAlert } from './DeleteAlert'

interface RecentDesignProps {
  title?: string;
  limit?: number;
}

type DesignType = {
  _id: Id<"designs">;
  _creationTime: number;
  jsonTemplate?: any;
  imagePreview?: string;
  width: number;
  height: number;
  name: string;
  uid: Id<"users">;
};

const RecentDesign = ({ title = "Recent Design", limit }: RecentDesignProps) => {
    const [designList,setDesignList] = useState<DesignType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [navLoading, setNavLoading] = useState(false);
  const [designToDelete, setDesignToDelete] = useState<DesignType | null>(null);
    const {userDetail} = useContext(UserDetailContext)
    const convex = useConvex()
  const router = useRouter();
  useEffect(() => {
    if (userDetail?._id) {
      getRecentDesign();
    }
  }, [userDetail]);

  const getRecentDesign = async () => {
    setIsLoading(true);
    const result = await convex.query(api.design.GetAllDesignByUser, {
      uid: userDetail._id as Id<"users">
    });
    setDesignList(Array.isArray(result) && limit ? result.slice(0, limit) : result);
    setIsLoading(false);
  };

  // Handles deleting a design and its image
  const handleDesignDelete = async () => {
    if (!designToDelete) return;
    
    setIsLoading(true);
    try {
      // Extract file path (including folders) from imagePreview for ImageKit
      let filePath = "";
      if (designToDelete.imagePreview) {
        try {
          const url = new URL(designToDelete.imagePreview);
          filePath = url.pathname.startsWith("/") ? url.pathname.slice(1) : url.pathname;
        } catch {
          filePath = `${designToDelete._id}.png`;
        }
      } else {
        filePath = `${designToDelete._id}.png`;
      }
      
      await convex.action(api.designActions.deleteDesignAndImage, {
        id: designToDelete._id,
        imageFileName: filePath,
      });
      
      await getRecentDesign();
      toast.success("Design deleted successfully");
    } catch (err) {
      toast.error("Failed to delete design");
    } finally {
      setIsLoading(false);
      setDesignToDelete(null);
    }
  };

    return (
    <div className='mt-7'>
      {navLoading && <FullScreenLoader />}
      {/* Delete Confirmation Modal */}
      <DeleteAlert 
        isOpen={!!designToDelete}
        onOpenChange={() => setDesignToDelete(null)}
        onConfirm={handleDesignDelete}
        itemName={`design "${designToDelete?.name}"`}
        isLoading={isLoading}
      />
      <h2 className='text-lg font-bold'>{title}</h2>
   {
    designList?.length==0?
    <div className='flex flex-col gap-4 items-center '>
        <Image src={'/edittool.png'} alt="edit" width={100} height={100} className="" />
        <h2 className="text-center">You dont have any design created yet</h2>
    <CustomCanvasDialog><Button>+ Create New</Button></CustomCanvasDialog>
   </div>
   :
   <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5'>
  {isLoading
    ? Array.from({ length: limit ?? 5 }).map((_, i) => (
        
        <SkeletonCard key={i}  className='w-full h-[200px] object-cover rounded-lg'/>
      ))
    : designList?.map((design) => (
        <div
          onClick={() => {
            setNavLoading(true);
            setTimeout(() => {
              router.push(`/design/${design?._id}`);
            }, 150);
          }}
          key={design._id}
          className="relative group"
        >
          {/* Delete button */}
          <button
            className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setDesignToDelete(design);
            }}
            disabled={isLoading}
            aria-label="Delete Design"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <Image
            src={design?.imagePreview ?? '/gallery.png'}
            alt={design?.name}
            width={500}
            height={200}
            className="w-full h-[200px] object-cover rounded-lg cursor-pointer transition-all duration-300 group-hover:blur-[3px] group-hover:brightness-90"
          />
          {/* Overlay shown on hover */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-md font-semibold text-white">
              Click to open in canvas
            </span>
          </div>
          <div className="mt-2 text-center font-bold text-gray-700 truncate">
            {design?.name}
          </div>
        </div>
      ))}
</div>
  }
    </div>
  )
}

export default RecentDesign