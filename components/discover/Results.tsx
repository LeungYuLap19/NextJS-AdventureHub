import React, { useEffect, useState } from 'react'
import Subtitle from './Subtitle'
import ResultsItem from './ResultsItem';
import { getFromLocalstorage, storeToLocalstorage } from '@/lib/actions/localStorage.actions';
import { nearbySearch, placeSearch } from '@/lib/actions/fourSquareAPI';
import { placeSearchFields, searchTabs } from '@/constants';
import { useSearchParams } from 'next/navigation';

export default function Results({ subtitle }: { subtitle: string }) {
  const [results, setResults] = useState<ResultsItem[]>([]);
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const handleResultsUpdated = () => {
    const resultsItems = getFromLocalstorage<ResultsItem>('resultsItems');
    setResults(resultsItems);
  };
  
  useEffect(() => {
    window.addEventListener('resultsUpdated', handleResultsUpdated);
    return () => {
      window.removeEventListener('resultsUpdated', handleResultsUpdated);
    };
  }, []);

  const getDefaultItems = async (latitude: number, longitude: number, noLocation: boolean) => {
    if (noLocation) {
      const data = await nearbySearch({ fields: placeSearchFields, limit: 24 });
      storeToLocalstorage('defaultItems', data);
      setResults(data);
    }
    else {
      const data = await placeSearch({
        latitude: latitude,
        longitude: longitude,
        radius: 5000,
        categories: searchTabs[0].categories,
        fields: placeSearchFields,
        sort: 'RELEVANCE',
        limit: 24
      });
      storeToLocalstorage('defaultItems', data);
      setResults(data);
    }
    
  }

  useEffect(() => {
    const defaultItems = getFromLocalstorage<ResultsItem>('defaultItems');
    const preivousItems = getFromLocalstorage<ResultsItem>('resultsItems');

    if (type === 'results') {
      setResults(preivousItems);
    }
    else if (defaultItems.length === 0) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          getDefaultItems(latitude, longitude, false);
        }, (error) => {
          getDefaultItems(0, 0, true);
        });
      }
    }
    else {
      setResults(defaultItems);
    }
  }, [type]);

  return (
    <div className='flex flex-col gap-7'>
      <Subtitle title={subtitle} />
      <div className='w-full grid grid-cols-4 gap-7 max-lg:grid-cols-3 max-md:grid-cols-2 max-lg:gap-4 3xl:grid-cols-6'>
          {
            results &&
            results.map((result: ResultsItem) => (
              <ResultsItem key={result.fsq_id} item={result} />
            ))
          }
      </div>
    </div>
  )
}
