import { cn, formatDate } from '@/lib/utils'
import { PlannersItem } from '@/types/components'
import React, { useEffect, useState } from 'react'

export default function PlannerCalendar({ planner }: { planner: PlannersItem }) {
  const dateList = formatDate(planner);
  const [selected, setSelected] = useState<FormattedDate>(dateList[0]);

  return (
    <div className='w-full flex flex-col md:p-7 gap-5 items-center'>
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
    </div>
  )
}
