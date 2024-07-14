import React from 'react'
import Logo from '../logo/Logo'
import Link from 'next/link'
import { navLinks } from '@/constants'
import NavigationTab from './NavigationTab'
import { getFromCookies } from '@/lib/actions/cookies.action'

export default async function Navigation() {
  const userData = await getFromCookies<UserData>('userData');

  return (
    <div className='w-full h-[60px] flex justify-between items-center'>
      <Logo height={60} width={60} style='text-3xl' />

      <div className='flex justify-between items-center gap-2'>
        {
          navLinks.map((link) => (
            <NavigationTab
              key={link.label}
              label={link.label}
              route={link.route}
              type='top'
            />
          ))
        }
      </div>

      <Link
        href={'/profile'}
        className='flex justify-center items-center text-xl h-12 aspect-square green-gradient text-customWhite-200 rounded-full flex-shrink-0 ml-3 max-sm:h-10'
      >
        {
          userData &&
          userData.username[0].toUpperCase()
        }
      </Link>
    </div>
  )
}
