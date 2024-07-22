import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import Image from 'next/image';
import AddToPlannerForm from './AddToPlannerForm';

export default function AddToPlanner() {
  const [open, setOpen] = useState(false);
  return (
    <div className='h-full flex items-center'>
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger>
          <Image
            className='cursor-pointer'
            src={'/root/add.svg'}
            alt='add-icon'
            width={20} height={20}
          />
        </DialogTrigger>
        <DialogContent
          onClick={(e) => e.stopPropagation()}
          className='bg-customWhite-100'
        >
          <DialogHeader>
            <DialogTitle>Add Place to Planner</DialogTitle>
            <DialogDescription>
              Select a planner to add this place to. You can also create a new planner in Planner page.
            </DialogDescription>
          </DialogHeader>

          <AddToPlannerForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
