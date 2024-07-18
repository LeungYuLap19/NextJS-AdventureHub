import Header from '@/components/discover/Header'
import AddTrip from '@/components/planner/AddTrip'
import Results from '@/components/planner/Results'
import SearchInput from '@/components/planner/SearchInput'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col gap-7 pt-[60px] max-sm:pt-[40px] max-lg:pb-28'>
      <Header title={<>Plan Your<br/>Perfect Trip</>} />
      <div className='flex justify-between gap-2'>
        <SearchInput />
        <div className='h-[50px] max-md:h-10 flex items-center gap-2'>
          <AddTrip />
        </div>
      </div>
      <Results />
      <Toaster />
    </div>
  )
}
