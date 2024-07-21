import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import PlacesItem from './PlacesItem'
import { Label } from '../ui/label'
import { DateTimePicker } from '../ui/dateTimePicker'
import { Button } from '../ui/button'

export default function PlannerSheet() {
  const [fromDateTime, setFromDateTime] = useState<Date | undefined>(undefined);
  const [toDateTime, setToDateTime] = useState<Date | undefined>(undefined);
  return (
    <Sheet>
      <SheetTrigger className='absolute left-4 bottom-3 bg-customGreen-400 text-customWhite-200 !px-4 !py-2 w-fit h-fit rounded-md'>
        <p className='max-3xl:text-xs font-normal'>
          Add
          <span className='max-lg:hidden'>{' to Calendar'}</span>
        </p>
      </SheetTrigger>
      <SheetContent side={'left'} className='max-sm:w-full !max-w-full w-[500px] bg-customWhite-200'>
        <div className='flex flex-col w-full gap-10 pt-10'>
          <PlacesItem type='sheet' />

          <div className="flex flex-col gap-2">
            <Label>From</Label>
            <DateTimePicker hourCycle={24} value={fromDateTime} onChange={setFromDateTime} />
            <Label>To</Label>
            <DateTimePicker hourCycle={24} value={toDateTime} onChange={setToDateTime} />
          </div>

          <Button className='w-fit h-fit py-2 px-4 bg-customGreen-400 text-customWhite-200 rounded-md'>
            Add to Calendar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
