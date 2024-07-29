import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import PlacesItem from './PlacesItem';
import { Label } from '../ui/label';
import { DateTimePicker } from '../ui/dateTimePicker';
import { Button } from '../ui/button';
import { PlannerSheetProps } from '@/types/components';
import { assignDateTime } from '@/lib/actions/firebasePlanner';
import { toast } from '../ui/use-toast';

export default function PlannerSheet({ item, planner, assignedDateTimes }: PlannerSheetProps) {
  const fromDateTimeInitial = assignedDateTimes?.from ? assignedDateTimes.from : planner.date.from;
  const toDateTimeInitial = assignedDateTimes?.to ? assignedDateTimes.to : (fromDateTimeInitial ? new Date(fromDateTimeInitial.getTime() + 60 * 60 * 1000) : undefined);

  const [fromDateTime, setFromDateTime] = useState<Date | undefined>(fromDateTimeInitial);
  const [toDateTime, setToDateTime] = useState<Date | undefined>(toDateTimeInitial);
  const [alert, setAlert] = useState<string | null>(null);
  const [disable, setDisable] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if ((fromDateTime && toDateTime) && (fromDateTime >= toDateTime)) {
      setAlert("Please select a 'To' date that is later than the 'From' date.");
      setDisable(true);
    } else {
      setAlert(null);
      setDisable(false);
    }
  }, [fromDateTime, toDateTime]);

  const onSubmit = async () => {
    setDisable(true);
    if (fromDateTime && toDateTime) {
      const done = await assignDateTime(planner.pid, item.fsq_id, fromDateTime, toDateTime);
      if (done) {
        setDisable(false);
        setOpen(false);
        toast({
          title: `${item.name} added to calendar`,
          description: `${fromDateTime.toString().slice(0, 21)} --- ${toDateTime.toString().slice(0, 21)}`,
        });
      } else {
        setDisable(false);
        toast({
          description: `Error adding ${item.name} to calendar`
        });
      }
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='absolute left-4 bottom-3 bg-customGreen-400 text-customWhite-200 !px-4 !py-2 w-fit h-fit rounded-md'>
        <p className='max-3xl:text-xs font-normal'>
          Add
          <span className='max-lg:hidden'>{' to Calendar'}</span>
        </p>
      </SheetTrigger>
      <SheetContent side={'left'} className='max-sm:w-full !max-w-full w-[500px] bg-customWhite-200'>
        <div className='flex flex-col w-full gap-10 pt-10'>
          <PlacesItem type='sheet' item={item} />

          <div className="flex flex-col gap-2">
            <Label>From</Label>
            <DateTimePicker 
              fromDate={planner.date.from}
              toDate={planner.date.to}
              hourCycle={24} 
              value={fromDateTime} 
              onChange={setFromDateTime} 
            />
            <Label>To</Label>
            <DateTimePicker 
              fromDate={planner.date.from}
              toDate={planner.date.to}
              hourCycle={24} 
              value={toDateTime} 
              onChange={setToDateTime} 
            />
            <div className='h-[20px]'>
              { alert && <p className='text-sm text-red-500'>{alert}</p>}
            </div>
          </div>

          <Button 
            disabled={disable}
            onClick={onSubmit}
            className='w-fit h-fit py-2 px-4 bg-customGreen-400 text-customWhite-200 rounded-md'
          >
            Add to Calendar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
