'use client'
import Header from '@/components/discover/Header'
import Results from '@/components/discover/Results'
import SearchInput from '@/components/discover/SearchInput'
import SearchTab from '@/components/discover/SearchTab'
import Subtitle from '@/components/discover/Subtitle'
import { searchTabs } from '@/constants'
import React, { useState } from 'react'

export default function page() {
  const [activeTab, setActiveTab] = useState<string>('All');

  return (
    <div className='flex flex-col gap-7 pt-[60px] max-sm:pt-[30px] max-lg:pb-28'>
      <Header 
        title={<>Where do<br />you want to go?</>}
      />

      <div className='flex gap-[20px] max-md:flex-col md:mb-12'>
        <SearchInput />
        <Subtitle
          title={<>Categories</>}
          style={'md:hidden'}
        />
        <div className='flex items-center h-[50px] max-md:h-10 overflow-auto'>
          {
            searchTabs.map(tab => (
                // search types
                <SearchTab 
                  key={tab.label}
                  label={tab.label}
                  imgUrl={tab.imgUrl}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
            ))
          }
        </div>
      </div>

      <div className='flex flex-col w-full gap-12'>
        <Results />
        <Results />
      </div>
      
    </div>
  )
}
