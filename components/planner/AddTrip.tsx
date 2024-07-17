'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import TripForm from './TripForm'

export default function AddTrip() {
  const [open, setOpen] = useState(false);
  return (
    <div className='max-2xl:text-sm bg-customGreen-400 text-customWhite-200 py-2 px-4 max-sm:px-2 rounded-md cursor-pointer flex-shrink-0'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className='max-sm:text-2xl flex gap-2 items-center'>
          <Image 
            src={'/root/create.svg'}
            alt='add'
            width={14} height={14}
            className='invert'
          />
          <span className='max-sm:hidden'>Add a Trip</span>
        </DialogTrigger>
        <DialogContent className='bg-customWhite-100'>
          <DialogHeader>
            <DialogTitle>Plan Your Next Adventure</DialogTitle>
            <DialogDescription>
              Every journey begins with a single click! 
            </DialogDescription>
          </DialogHeader>

          <TripForm setOpen={setOpen}/>
        </DialogContent>
      </Dialog>
    </div>
    
  )
}
