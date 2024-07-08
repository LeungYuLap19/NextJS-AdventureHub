'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavigationTab({ label, route, type }: NavigationTabProps) {
  const pathname = usePathname();
  const isActive = pathname === route;

  return (
    <Link
      href={route}
      className={cn('py-2 px-4 rounded-lg max-sm:text-sm text-customBlack-300', {
        'bg-customGreen-400 text-customWhite-200': isActive,
        'max-lg:hidden max-2xl:text-sm': type === 'top'
      })}
    >
      <p>{label}</p>
    </Link>
  )
}
