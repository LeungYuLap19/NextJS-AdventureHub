import React from 'react'
import Subtitle from './Subtitle'
import ResultsItem from './ResultsItem';

export default function Results({ categorizedResults }: { categorizedResults: CategorizedResultsItem }) {
  return (
    <div className='flex flex-col gap-7'>
      <Subtitle title={categorizedResults.label} />
      <div className='w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4 3xl:grid-cols-6'>
          {
            categorizedResults.results &&
            categorizedResults.results.map((result: ResultsItem) => (
              <ResultsItem key={result.fsq_id} item={result} />
            ))
          }
      </div>
    </div>
  )
}
