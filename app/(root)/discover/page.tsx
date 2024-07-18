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
import { getLocalWeather } from '@/lib/actions/weatherAPI';
import { cn } from '@/lib/utils';

const DiscoverPage = () => {
  const [activeTab, setActiveTab] = useState<CategorizedSearchTabParams>(categorizedSearchTabs[0]);
  const [title, setTitle] = useState<React.ReactNode>(<>Where do<br />you want to go?</>);
  const [weather, setWeather] = useState<Weather| null>(null);
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const { results } = useGetResults(type);

  const getWeather = async ({ latitude, longitude }: LatLong) => {
    const data = await getLocalWeather({latitude, longitude});
    if (data) {
      setWeather(data);
    }
  }

  useEffect(() => {
    if (type === 'results') {
      const resultsTab = getFromLocalstorage<CategorizedSearchTabParams>('resultsTab');
      const resultsGeo = getFromLocalstorage<AutoCompleteResponse>('resultsGeo');
      if (resultsTab.length !== 0 && resultsGeo.length !== 0) {
        setActiveTab(resultsTab[0]);
        const placeName = resultsGeo[0].text.primary;
        setTitle(
          <> 
            {placeName.split(',')[0]}
            {
              placeName.length > 1 &&
              <>
                <br/>{placeName.split(',').splice(1).join(', ')}
              </>
            }
          </>
        )
        const placeGeo = resultsGeo[0].geo.center;
        getWeather({ latitude: placeGeo.latitude, longitude: placeGeo.longitude });
      }
    }
    else {
      setActiveTab(categorizedSearchTabs[0]);
      setTitle(<>Where do<br />you want to go?</>);
      setWeather(null);
    }
  }, [type, results]);

  return (
    <div className='flex flex-col gap-7 pt-[30px] max-sm:pt-[10px] max-lg:pb-28'>
      <div className='flex items-center h-[30px] mb-[-25px] w-full'>
        {
          weather &&
            <p className='max-md:text-sm text-customBlack-200 w-full truncate'>
              <span className={cn('font-bold', {
                'text-slate-500': weather.current.temp_c  <= 10,
                'text-blue-500': weather.current.temp_c > 10,
                'text-yellow-400': weather.current.temp_c > 20,
                'text-amber-500': weather.current.temp_c > 25,
                'text-red-700': weather.current.temp_c > 30,
              })}>{weather.current.temp_c}°C</span>
              {' ∙ ' + weather.current.condition.text}
            </p>
        }
      </div>
      <Header title={title} />

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
          results.map((categorizedResults: CategorizedResultsItem) => {
            if (categorizedResults.results.length > 0) {
              return <Results key={categorizedResults.label} categorizedResults={categorizedResults} />
            }
          })
        }
      </div>
    </div>
  );
};

const WrappedDiscoverPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    {/* <DiscoverPage /> */}
  </Suspense>
);

export default WrappedDiscoverPage;
