'use client'
import React, { useEffect, useState, Suspense } from 'react';
import Header from '@/components/discover/Header';
import Results from '@/components/discover/Results';
import SearchInput from '@/components/discover/SearchInput';
import SearchTab from '@/components/discover/SearchTab';
import Subtitle from '@/components/discover/Subtitle';
import { searchTabs } from '@/constants';
import { getFromLocalstorage } from '@/lib/actions/localStorage.actions';
import { useSearchParams } from 'next/navigation';

const DiscoverPage = () => {
  const [activeTab, setActiveTab] = useState<SearchTabParams>(searchTabs[0]);
  const [subtitle, setSubtitle] = useState<string>('Popular places around you');
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  useEffect(() => {
    if (type === 'results') {
      const subtitle = getFromLocalstorage<string>('resultsSubtitle');
      setSubtitle(subtitle[0]);
    } else {
      setSubtitle('Popular places around you');
    }
  }, [type]);

  return (
    <div className='flex flex-col gap-7 pt-[60px] max-sm:pt-[30px] max-lg:pb-28'>
      <Header title={<>Where do<br />you want to go?</>} />

      <div className='flex gap-[20px] max-md:flex-col md:mb-12'>
        <SearchInput activeTab={activeTab} setSubtitle={setSubtitle} />
        <Subtitle title={<>Categories</>} style={'md:hidden'} />
        <div className='flex items-center h-[50px] max-md:h-10 overflow-auto'>
          {searchTabs.map((tab: SearchTabParams) => (
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
        <Results subtitle={subtitle} />
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
