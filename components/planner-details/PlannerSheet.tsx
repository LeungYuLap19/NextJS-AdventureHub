import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export default function PlannerSheet() {
  return (
    <Sheet>
      <SheetTrigger className='absolute left-4 bottom-3 bg-customGreen-400 text-customWhite-200 !px-4 !py-2 w-fit h-fit rounded-md'>
        <p className='max-2xl:text-xs font-normal'>
          Add
          <span className='max-lg:hidden'>{' to Calendar'}</span>
        </p>
      </SheetTrigger>
      <SheetContent side={'left'} className='max-sm:w-full !max-w-full w-[500px] bg-customWhite-200'>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
