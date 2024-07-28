import { times } from '@/constants'
import React from 'react'
import CalendarTimeSlot from './CalendarTimeSlot'

export default function CalendarTimeSlots() {
  return (
    <div className='w-full'>
      {
        times.map((time, index) => {
          if (index === 0) {
            return <></>
          }
          else if (index === 1) {
            return <CalendarTimeSlot key={index} first={times[0]} time={time} />
          }
          else {
            return <CalendarTimeSlot key={index} time={time} />
          }
        })
      }
    </div>
  )
}
