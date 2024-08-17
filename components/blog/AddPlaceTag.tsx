import React, { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Input } from '../ui/input';
import { autoComplete } from '@/lib/actions/fourSquareAPI';
import { Label } from '../ui/label';
import { toast } from '../ui/use-toast';

export default function AddPlaceTag({ placeTags, setPlaceTags }: { placeTags: AutoCompleteResponse[]; setPlaceTags: (placeTags: AutoCompleteResponse[]) => void }) {
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchResults, setSearchResults] = useState<AutoCompleteResponse[]>([]);

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 3) {
      const data: AutoCompleteResponse[] = await autoComplete({ name: e.target.value, limit: 5 });
      setSearchResults(data);
    }
    else {
      setSearchResults([]);
    }
  }

  const addToPlaceTags = (selected: AutoCompleteResponse) => {
    const included = placeTags.find(tag => tag.text.primary === selected.text.primary);
    if (!included) {
      setPlaceTags([...placeTags, selected]);
    }
    else {
      toast({
        description: `${selected.text.primary} already included in tags.`
      });
    }
  }

  const handleOnClick = (selected: AutoCompleteResponse) => {
    if (inputRef.current) {
      addToPlaceTags(selected);
      setOpen(false);
    }
  }

  useEffect(() => {
    setSearchResults([]);
  }, [open]);

  return (
    <div className='px-4 py-2 rounded-full bg-customGreen-400 text-customWhite-200 cursor-pointer'>
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger className='flex gap-2 items-center text-xs'>
          <Image 
            src={'/root/create.svg'}
            alt='add'
            width={10} height={10}
            className='invert'
          />
          <span>Add Place Tag</span>
        </DialogTrigger>
        <DialogContent
          onClick={(e) => e.stopPropagation()}
          className='bg-customWhite-200'
        >
          <DialogHeader>
            <DialogTitle>Add Place Tags for this Blog</DialogTitle>
            <DialogDescription>
              You can make your blog more discoverable! This means your blog can be featured in recommendations for other users who are interested in similar locations.
            </DialogDescription>
          </DialogHeader>

          <div className='flex flex-col gap-2 relative'>
            <Label htmlFor='place'>Place</Label>
            <Input 
              onChange={handleOnChange}
              id='place'
              ref={inputRef}
              autoComplete='off'
              placeholder='city/place name'
              type='text'
              className='bg-transparent border border-customBlack-100 placeholder:text-customBlack-100'
            />
            {
              searchResults.length > 0 &&
              <div className='flex flex-col absolute top-[73px] left-0 w-full bg-customWhite-200 z-50 rounded-lg overflow-hidden drop-shadow-default'>
                {
                  searchResults.map((result: AutoCompleteResponse, index: number) => (
                    <p
                      key={index}
                      onClick={() => handleOnClick(result)}
                      className='w-full px-3 py-2 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:bg-customWhite-100'>
                      {result.text.primary}
                    </p>
                  ))
                }
              </div>
            }
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
