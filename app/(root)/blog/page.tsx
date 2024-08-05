import CreateBlogBotton from '@/components/blog/CreateBlogBotton'
import Results from '@/components/blog/Results'
import SearchInput from '@/components/blog/SearchInput'
import Header from '@/components/discover/Header'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col gap-7 pt-[60px] max-sm:pt-[40px] max-lg:pb-28'>
      <Header title={<>Your Travel Stories,<br/>Our Community</>} />
      <div className='flex justify-between gap-2'>
        <SearchInput /> 
        <div className='h-[50px] max-md:h-10 flex items-center gap-2'>
          <CreateBlogBotton />
        </div>
      </div>
      <Results />
      <Toaster />
    </div>
  )
}
