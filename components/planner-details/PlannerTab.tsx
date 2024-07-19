import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'

export default function PlannerTab({ tab, selected, setSelected }: PlannerTabProps) {
  const isSelected = selected.label === tab.label ? true : false;

  return (
    <div 
      className={cn('flex justify-center items-center h-[60px] max-md:h-[50px] aspect-square rounded-lg cursor-pointer', {
        'bg-customGreen-400 text-customWhite-200': isSelected
      })}
      onClick={() => setSelected(tab)} 
    >
      <Image 
        src={tab.imgUrl}
        alt={tab.label}
        width={20} height={20}
        className={`${isSelected && 'invert'}`}
      />
    </div>
  )
}
