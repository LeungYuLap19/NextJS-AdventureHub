import { useGetPlanners } from '@/lib/hooks/useGetPlanners'
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PlannersItem } from '@/types/components';

export default function AddToPlannerForm({ setSelected }: { setSelected: (selected: PlannersItem) => void }) {
  const { planners } = useGetPlanners();

  return (
    <Select
      onValueChange={(value) => {
        const planner = planners.find((p: PlannersItem) => p.pid === value);
        if (planner) {
          setSelected(planner);
        }
      }}
    >
      <SelectTrigger className="w-full h-[40px] max-2xl:text-sm bg-customWhite-200 border border-customBlack-100">
        <SelectValue placeholder={`${planners.length > 0 ? 'Pick a Planner' : 'No Planners'}`} />
      </SelectTrigger>
      {
        planners.length > 0 &&
        <SelectContent avoidCollisions={true} className='bg-customWhite-200 w-fit text-left'> 
          <SelectGroup>
            {
              planners.map((planner: PlannersItem) => (
                <SelectItem key={planner.pid} value={planner.pid}>{planner.name}</SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      }
    </Select>
  )
}
