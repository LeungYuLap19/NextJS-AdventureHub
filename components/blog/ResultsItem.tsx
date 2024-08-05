import { cn } from '@/lib/utils'
import React from 'react'

export default function ResultsItem({ type }: { type: 'recommend' | 'popular' }) {
  return (
    <div className={cn('flex-shrink-0 relative bg-customWhite-200 rounded-lg overflow-hidden cursor-pointer', {
      'sm:w-full sm:pt-[56.8%] max-sm:h-full max-sm:pl-[70%]': type === 'recommend',
      'w-full pt-[40%]': type === 'popular'
    })}>
      <div className='absolute inset-0'>

      </div>
    </div>
  )
}
