import React from 'react'
import Subtitle from './Subtitle'
import ResultsItem from './ResultsItem';

export default function Results() {
  const subtitle = 'Popular places around you';
  const tempItem = {
    displayName: 'Place Name',
    types: 'place types',
    rating: 5.0, 
  }

  return (
    <div className='flex flex-col gap-7'>
      <Subtitle title={subtitle} />
      <div className='w-full grid grid-cols-4 gap-7 max-lg:grid-cols-3 max-md:grid-cols-2 max-lg:gap-4 3xl:grid-cols-6'>
        {Array.from({ length: 12 }, (_, index) => (
          <ResultsItem key={index} item={tempItem} />
        ))}
      </div>
    </div>
  )
}
