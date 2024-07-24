import React, { useState } from 'react'
import Header from '../discover/Header'
import TripForm from '../planner/TripForm'
import { PlannersItem } from '@/types/components'
import { Button } from '../ui/button'
import { deletePlanner } from '@/lib/actions/firebasePlanner'
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

export default function PlannerEdit({ planner }: { planner: PlannersItem }) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleOnClick = async () => {
    setLoading(true);
    const done = await deletePlanner(planner.pid);
    if (done) {
      toast({
        title: `${planner.name} deleted.`
      });
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      router.push(`${baseUrl}planner`);
    }
    else {
      setLoading(false);
      toast({
        title: `Failed to delete ${planner.name}.`
      });
    }
  }

  return (
    <div className='flex flex-col gap-7 md:p-7 md:pb-10 h-full justify-between'>
      <div className='flex flex-col gap-7'>
        <Header title={<>Edit Your Trip</>} />
        <TripForm type='edit' defaultValues={planner} pid={planner.pid} />
      </div>

      <Button 
        onClick={handleOnClick}
        disabled={loading}
        className='w-full py-2 rounded-md bg-red-600 text-customWhite-200'
      >
        {'( Danger ) Delete Planner'}
      </Button>
    </div>
  )
}
