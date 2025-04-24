import { Button } from '@/components/ui/button'
import { useCanvasHook } from '@/context/CanvasContext'
import { query } from '@/convex/_generated/server'
import axios from 'axios'
import { FabricImage } from 'fabric'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const SearchImage = () => {
         const {canvasEditor} = useCanvasHook();
    
    const [imageList, setImageList] = useState([])
    const [searchInput, setSearchInput] = useState('')
    useEffect(()=>{
        getImageList('gradient')
    },[query])

    const getImageList = async(searchInput: string)=>{
        const result = await axios.get('https://api.unsplash.com/search/photos', {
           params:{
            query :searchInput,
            page:1,
            per_page:20
           },
           headers:{
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
           }
        })
        setImageList(result?.data?.results)
    }

    const setImageToFabric = async (url: string) => {
        const canvasImageRef = await FabricImage.fromURL(url)
        canvasEditor?.add(canvasImageRef)
        canvasEditor?.renderAll()
    }
  return (
  <div className="mt-4">
    <h2 className="text-lg font-semibold mb-3">Search Images</h2>
    <div className="flex items-center gap-2 mb-4">
      <input
        placeholder="Search images"
        onChange={e => setSearchInput(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white"
      />
      <Button onClick={() => getImageList(searchInput)} size="icon" variant="outline" className="border border-gray-300">
        <SearchIcon className="w-5 h-5 text-gray-500" />
      </Button>
    </div>
    <div className="grid grid-cols-2 gap-4 overflow-auto h-[45vh]">
      {imageList.map((image) => (
          <Image
          key={image?.id}
            width={300}
            height={300}
            className="w-full h-[80px] rounded-lg"
            src={image?.urls?.thumb}
            alt={image?.slug}
            onClick={() => setImageToFabric(image?.urls?.regular)}
          />
      ))}
    </div>
  </div>
  )
}

export default SearchImage