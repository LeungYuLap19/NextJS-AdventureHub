import React from 'react'

export default function Badge({ text, lead=false }: { text: string, lead?: boolean }) {
  return (
    <div className={`px-2 py-1 bg-customWhite-200 rounded-lg h-fit w-fit max-2xl:text-sm drop-shadow-default ${lead && '!bg-customWhite-100 !drop-shadow-none !pl-0 font-semibold'}`}>
        {text}
    </div>
  )
}
