import { navLinks } from '@/constants'
import React from 'react'
import NavigationTab from './NavigationTab'

export default function BottomNavigation() {
  return (
    <div className='flex p-3 drop-shadow-default rounded-xl gap-[1vw] bg-customWhite-200'>
      {
        navLinks.map((link) => (
          <NavigationTab
            key={link.label}
            label={link.label}
            route={link.route}
            type='bot'
          />
        ))
      }
    </div>
  )
}
