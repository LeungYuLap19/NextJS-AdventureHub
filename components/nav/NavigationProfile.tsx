'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { removeFromCookies } from '@/lib/actions/cookies.action'
import { useRouter } from 'next/navigation'
import { toast } from '../ui/use-toast'

export default function NavigationProfile({ userData }: { userData: UserData }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='flex justify-center items-center text-xl h-12 aspect-square green-gradient text-customWhite-200 rounded-full flex-shrink-0 ml-3 max-sm:h-10'>
          {
            userData &&
            userData.username[0].toUpperCase()
          }
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer'
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => {
            removeFromCookies('userData');
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            router.push(`${baseUrl}sign-in`);
            toast({
              description: `${userData.username} logged out.`
            })
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
