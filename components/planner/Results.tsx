'use client'
import React from 'react';
import ResultsItem from '../discover/ResultsItem';
import Subtitle from '../discover/Subtitle';
import SortBy from './SortBy';
import { PlannersItem } from '@/types/components';
import { useGetPlanners } from '@/lib/hooks/useGetPlanners';

export default function Results() {
  const { planners, filtered, noInput, setSelected } = useGetPlanners();

  return (
    <div className='flex flex-col w-full gap-7'>
      <div className='flex justify-between items-center w-full'>
        <Subtitle title={planners.length <= 0 ? 'No Trips' : 'Your Trips'} />
        <SortBy setSelected={setSelected}/>
      </div>
      <div className='w-full grid grid-cols-4 gap-7 max-lg:grid-cols-3 max-md:grid-cols-2 max-lg:gap-4 3xl:grid-cols-6'>
        {filtered.length > 0 ?
          filtered.map((planner: PlannersItem) => (
            <ResultsItem key={planner.pid} plannersItem={planner} />
          )) :
          planners.length > 0 && noInput ?
            planners.map((planner: PlannersItem) => (
              <ResultsItem key={planner.pid} plannersItem={planner} />
            )) :
            <></>
        }
      </div>
    </div>
  );
}
