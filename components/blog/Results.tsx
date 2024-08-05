import React from 'react'
import Subtitle from '../discover/Subtitle'
import ResultsItem from './ResultsItem'

export default function Results() {
  return (
    <div className='flex flex-col w-full gap-7'>
      <Subtitle title={'Recommendation'} />
      <div className='w-full grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-lg:gap-4
      max-sm:grid-cols-none max-sm:h-[80vw] max-sm:flex max-sm:overflow-auto'>
        {
          Array.from({ length: 6 }, (_, index) => (
            <ResultsItem key={index} type='recommend' />
          ))
        }
      </div>

      <Subtitle title={'Popular Blogs'} />
      <div className='w-full grid grid-cols-2 gap-7 max-md:grid-cols-1 max-lg:gap-4'>
        {
          Array.from({ length: 12 }, (_, index) => (
            <ResultsItem key={index} type='popular' />
          ))
        }
      </div>
    </div>
  )
}
