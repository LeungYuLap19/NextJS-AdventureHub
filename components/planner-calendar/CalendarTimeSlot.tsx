import React from 'react'
import CalendarTimeLine from './CalendarTimeLine';

export default function CalendarTimeSlot({ time, first }: { time: string; first?: string }) {
  return (
    <div className='w-full h-[50px] relative pl-12'>
      { first && <CalendarTimeLine time={first} className='absolute left-0 top-[-6px]' /> }

      <CalendarTimeLine time={time} className='absolute left-0 bottom-[-6px]' />
    </div>
  )
}
