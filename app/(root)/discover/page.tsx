'use client'
import React, { useEffect, useState, Suspense } from 'react';
import Header from '@/components/discover/Header';
import Results from '@/components/discover/Results';
import SearchInput from '@/components/discover/SearchInput';
import SearchTab from '@/components/discover/SearchTab';
import Subtitle from '@/components/discover/Subtitle';
import { categorizedSearchTabs } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { useGetResults } from '@/lib/hooks/useGetResults';
import { getFromLocalstorage } from '@/lib/actions/localStorage.actions';

const DiscoverPage = () => {
  const [activeTab, setActiveTab] = useState<CategorizedSearchTabParams>(categorizedSearchTabs[0]);
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const { results } = useGetResults(type);

  useEffect(() => {
    if (type === 'results') {
      const resultsTab = getFromLocalstorage<CategorizedSearchTabParams>('resultsTab');
      if (resultsTab.length !== 0) {
        setActiveTab(resultsTab[0]);
      }
    }
    else {
      setActiveTab(categorizedSearchTabs[0]);
    }
  }, [type]);

  return (
    <div className='flex flex-col gap-7 pt-[60px] max-sm:pt-[30px] max-lg:pb-28'>
      <Header title={<>Where do<br />you want to go?</>} />

      <div className='flex gap-[20px] max-md:flex-col md:mb-12'>
        <SearchInput activeTab={activeTab} />
        <Subtitle title={<>Categories</>} style={'md:hidden'} />
        <div className='flex items-center h-[50px] max-md:h-10 overflow-auto'>
          {categorizedSearchTabs.map((tab: CategorizedSearchTabParams) => (
            <SearchTab 
              key={tab.label}
              tab={tab}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col w-full gap-12'>
        {
          results.map((categorizedResults: CategorizedResultsItem) => (
            <Results key={categorizedResults.label} categorizedResults={categorizedResults} />
          ))
        }
      </div>
    </div>
  );
};

const WrappedDiscoverPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <DiscoverPage />
  </Suspense>
);

export default WrappedDiscoverPage;
