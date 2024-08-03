import { cn, formatDate } from '@/lib/utils'
import { PlannersItem } from '@/types/components'
import React, { useEffect, useState } from 'react'
import CalendarTimeSlots from '../planner-calendar/CalendarTimeSlots';
import { useGetPlannerPlaces } from '@/lib/hooks/useGetPlannerPlaces';

export default function PlannerCalendar({ planner }: { planner: PlannersItem }) {
  const dateList = formatDate(planner);
  const [selected, setSelected] = useState<FormattedDate>(dateList[0]);
  const { plannerPlaces } = useGetPlannerPlaces(planner);
  const [placesOfSelected, setPlacesOfSelected] = useState<PlannerPlace[]>([]);

  useEffect(() => {
    const selectedDate = new Date(selected.year, new Date(`${selected.month} 1, ${selected.year}`).getMonth(), selected.day);
    const placesArray: PlannerPlace[] = [];
    plannerPlaces && 
    plannerPlaces.places.forEach((place) => {
      const fromDate = place.assignedDateTimes.from;
      const toDate = place.assignedDateTimes.to;
      if (fromDate && toDate) {
        // console.log({selectedDate, fromDate, toDate})
        const isWithin = selectedDate >= new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()) &&
                 selectedDate <= new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
        // console.log(isWithin);

        if (isWithin) {
          placesArray.push(place);
        }
      }
    });

    setPlacesOfSelected(placesArray);
  }, [selected, plannerPlaces]);

  return (
    <div className='w-full flex flex-col md:p-7 gap-5 items-center h-fit max-md:overflow-hidden'>
      <div className='max-w-full overflow-auto flex gap-3'>
        {
          dateList.map((date: FormattedDate, index) => (
            <div 
              key={index}
              className='flex flex-col gap-2 items-center cursor-pointer'
              onClick={() => setSelected(date)}
            >
              <p className='text-sm'>{date.weekday[0]}</p>
              <div 
                className={cn('w-[50px] h-[50px] rounded-lg flex justify-center items-center', {
                  'bg-customGreen-400 text-customWhite-200': selected && selected.day === date.day && selected.month === date.month && selected.year === date.year,
                })}
              >
                <p>{date.day}</p>
              </div>
            </div>
          ))
        }
      </div>

      <div className='w-full flex justify-center'>
        <p className='font-semibold'>{`${selected.weekday} ∙ ${selected.month.slice(0, 3)} ${selected.day} ${selected.year}`}</p>
      </div>

      <CalendarTimeSlots placesOfSelected={placesOfSelected} selected={selected} planner={planner} />
    </div>
  )
}
