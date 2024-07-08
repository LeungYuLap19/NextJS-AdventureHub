import { cn } from '@/lib/utils'
import React from 'react'

export default function Subtitle({ title, style }: SubtitleProps) {
  return (
    <p className={cn('text-3xl font-semibold text-customBlack-300 max-md:text-xl', style)}>
        {title}
    </p>
  )
}
