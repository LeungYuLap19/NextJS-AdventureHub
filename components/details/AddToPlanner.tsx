import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import Image from 'next/image';
import AddToPlannerForm from './AddToPlannerForm';
import { Button } from '../ui/button';
import { PlannersItem } from '@/types/components';
import { addToPlanner } from '@/lib/actions/firebasePlanner';
import { toast } from '../ui/use-toast';

export default function AddToPlanner({ resultsItem }: { resultsItem: ResultsItem }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<PlannersItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setLoading(true);
    if (selected) {
      const data = await addToPlanner(resultsItem, selected.pid);
      if (data?.message) {
        setLoading(false);
        setOpen(false);
        toast({
          title: data.message
        });
      }
      else if (data) {
        setLoading(false);
        setOpen(false);
        toast({
          title: `Added to ${selected.name} ∙ ${resultsItem.name}`,
          description: `You can assign places to calendar in ${selected.name}`,
        });
      }
    }
    else {
      setLoading(false);
      toast({
        title: 'Choose a planner or create on in Planner page.'
      });
    }
  }

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
          className='bg-customWhite-200'
        >
          <DialogHeader>
            <DialogTitle>Add Place to Planner</DialogTitle>
            <DialogDescription>
              Select a planner to add this place to. You can also create a new planner in Planner page.
            </DialogDescription>
          </DialogHeader>

          <AddToPlannerForm setSelected={setSelected} />

          <Button
            disabled={loading}
            onClick={onSubmit}
            className={'h-10 green-gradient text-customWhite-200 w-fit'}
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
