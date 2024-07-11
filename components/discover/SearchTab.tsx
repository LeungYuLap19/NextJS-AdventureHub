import React from 'react'
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function SearchTab({ tab, activeTab, setActiveTab }: SearchTabProps) {
  const isActive = tab.label === activeTab.label;
  return (
    <div 
      className={cn('flex gap-2 items-center px-4 py-2 text-customBlack-300 rounded-md cursor-pointer max-2xl:text-sm flex-shrink-0', {
        'bg-customGreen-400 text-customWhite-200': isActive
      })}
      onClick={() => setActiveTab(tab)}
    >
      <div className='h-4 relative aspect-square'>
        <Image 
          className={`${isActive && 'invert'}`}
          src={tab.imgUrl}
          alt={tab.label}
          fill={true}
          style={{objectFit: 'cover', objectPosition: 'center'}}
        />
      </div>
      {tab.label}
    </div>
  )
}
