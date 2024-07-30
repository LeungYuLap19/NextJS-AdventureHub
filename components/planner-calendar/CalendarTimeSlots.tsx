import { times } from '@/constants';
import React, { useEffect, useState } from 'react';
import CalendarTimeLine from './CalendarTimeLine';
import PlannerSheet from '../planner-details/PlannerSheet';
import { PlannersItem } from '@/types/components';

export default function CalendarTimeSlots({ placesOfSelected, selected, planner }: { placesOfSelected: PlannerPlace[]; selected: FormattedDate; planner: PlannersItem }) {
  const [columns, setColumns] = useState<PlannerPlace[][]>([]);
  const selectedDate = new Date(selected.year, new Date(`${selected.month} 1, ${selected.year}`).getMonth(), selected.day);

  useEffect(() => {
    const newColumns: PlannerPlace[][] = [];

    placesOfSelected.forEach((place) => {
      let placed = false;
      for (let col of newColumns) {
        if (!col.some(existingPlace => isOverlapping(existingPlace, place))) {
          col.push(place);
          placed = true;
          break;
        }
      }

      if (!placed) {
        newColumns.push([place]);
      }
    });

    setColumns(newColumns);
  }, [placesOfSelected]);

  const isOverlapping = (place1: PlannerPlace, place2: PlannerPlace) => {
    const from1 = place1.assignedDateTimes?.from;
    const to1 = place1.assignedDateTimes?.to;
    const from2 = place2.assignedDateTimes?.from;
    const to2 = place2.assignedDateTimes?.to;

    if (!from1 || !to1 || !from2 || !to2) {
      return false;
    }

    return !(to1 <= from2 || from1 >= to2);
  };

  return (
    <div className='w-full h-[1200px] relative'>
      <div className='h-full w-full flex pl-12 mt-[6px] pb-[12px] gap-1'>
        {columns.map((col, colIndex) => (
          <div key={colIndex} className='flex-1 h-full relative'>
            {col.map((place, placeIndex) => {
              const fullDayInMin = 24 * 60;
              const starting = place.assignedDateTimes.from;
              const ending = place.assignedDateTimes.to;
              if (starting && ending) {
                const startingInMin = starting.getHours() * 60 + starting.getMinutes();
                const endingInMin = ending.getHours() * 60 + ending.getMinutes();

                let top = (startingInMin / fullDayInMin) * 100;
                let height;

                if (starting < selectedDate && ending > new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)) {
                  // Spans entire selected day
                  top = 0;
                  height = 100;
                } else if (starting < selectedDate && ending.toDateString() === selectedDate.toDateString()) {
                  // Ends on selected date
                  top = 0;
                  height = (endingInMin / fullDayInMin) * 100;
                } else if (starting.toDateString() === selectedDate.toDateString() && ending > new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)) {
                  // Starts on selected date
                  top = (startingInMin / fullDayInMin) * 100;
                  height = ((fullDayInMin - startingInMin) / fullDayInMin) * 100;
                } else if (starting.toDateString() === selectedDate.toDateString() && ending.toDateString() === selectedDate.toDateString()) {
                  // Within selected date
                  top = (startingInMin / fullDayInMin) * 100;
                  height = ((endingInMin - startingInMin) / fullDayInMin) * 100;
                }                             

                return (
                  <div 
                    key={placeIndex}
                    className='absolute w-full rounded-lg bg-customGreen-200 text-customWhite-200 p-2 pl-3 z-40'
                    style={{ top: `${top}%`, height: `${height}%` }}
                  >
                    <p className='w-full line-clamp-1'>{place.place.name}</p> 
                    <div className='w-full h-full relative'>
                      <PlannerSheet item={place.place} planner={planner} assignedDateTimes={place.assignedDateTimes} type='calendar' />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
      
      <div className='absolute w-full h-full top-0 left-0 flex flex-col justify-between z-10'>
        {times.map((time: string, index) => (
          <CalendarTimeLine key={index} time={time} />
        ))}
      </div>
    </div>
  );
}
