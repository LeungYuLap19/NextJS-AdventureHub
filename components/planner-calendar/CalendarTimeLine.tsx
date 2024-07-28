import React from 'react'

export default function CalendarTimeLine({ time, className }: { time: string; className: string }) {
  return (
    <div className={`flex gap-2 w-full items-center h-3 ${className}`}>
       <p className='text-customBlack-200 text-sm w-11 text-right'>{time}</p>
       <span className='flex-grow h-[1px] bg-slate-200 rounded-full'></span>
    </div>
  )
}
