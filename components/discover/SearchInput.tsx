'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { countCommaSpacePairs, formUrlQuery, handleKeyDown } from '@/lib/utils'
import { autoComplete, placeSearch } from '@/lib/actions/fourSquareAPI';
import { placeSearchFields } from '@/constants';
import { getFromLocalstorage, storeToLocalstorage } from '@/lib/actions/localStorage.actions';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchInput({ activeTab }: { activeTab: CategorizedSearchTabParams }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchResults, setSearchResults] = useState<AutoCompleteResponse[] | null>(null);
  const [selected, setSelected] = useState<AutoCompleteResponse | null>(null);
  const [disable, setDisable] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const router = useRouter();

  useEffect(() => {
    if (type === 'results') {
      const resultsGeo = getFromLocalstorage<AutoCompleteResponse>('resultsGeo');
      if (resultsGeo.length !== 0) {
        setSelected(resultsGeo[0]);
        if (inputRef.current) {
          inputRef.current.value = resultsGeo[0].text.primary;
        }
      }
    }
    else {
      if (inputRef.current) {
        setSelected(null);
        inputRef.current.value = '';
      }
    }
  }, [type]);

  const handleEnter = () => {
    if (inputRef.current && searchResults && !selected) {
      setSelected(searchResults[0]);
      inputRef.current.value = searchResults[0].text.primary;
    }
  }

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 3) {
      const data: AutoCompleteResponse[] = await autoComplete({ name: e.target.value, limit: 5 });
      setSearchResults(data);
    }
    else {
      setSearchResults(null);
      setSelected(null);
    }
  }

  const handleOnClick = async (selected: AutoCompleteResponse) => {
    if (inputRef.current) {
      setSelected(selected);
      inputRef.current.value = selected.text.primary;

      setSearchResults(null);
      inputRef.current.focus();
    }
  }

  const handleSearch = async () => {
    if (selected) {
      const latitude = selected.geo.center.latitude;
      const longitude = selected.geo.center.longitude;
      const radius = countCommaSpacePairs(selected.text.primary) == 0 ? 50000 : 10000;
      const fields = placeSearchFields;
      const sort = 'RELEVANCE';
      const limit = (activeTab.label === 'All' || activeTab.label === 'Events') ? 24 : 8;

      setDisable(true);

      const categorizedResults: CategorizedResultsItem[] = [];
      
      for (const [categoryLabel, categoryIds] of Object.entries(activeTab.categories)) {
        const data = await placeSearch({ latitude, longitude, radius, categories: categoryIds, fields, sort, limit });
        categorizedResults.push({ label: categoryLabel, results: data });
      }
      storeToLocalstorage<CategorizedResultsItem>('resultsItems', categorizedResults);
      storeToLocalstorage<AutoCompleteResponse>('resultsGeo', [selected]);
      storeToLocalstorage<CategorizedSearchTabParams>('resultsTab', [activeTab]);
      
      const event = new Event('resultsUpdated');
      window.dispatchEvent(event);
      setSearchResults(null);
      setDisable(false);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        query: {
          type: 'results',
        },
      });
      router.push(newUrl, { scroll: false });
    }
  }

  return (
    <div className='md:w-[60%] flex-shrink-0 relative overflow-x-visible'>
      <Input 
        ref={inputRef}
        className='pr-[55px] border border-customBlack-100 bg-customWhite-100 placeholder:text-customBlack-100 h-[50px] max-md:h-10'
        placeholder={'Search for places...'}
        onKeyDown={(event) => handleKeyDown({event, func: handleEnter})}
        onChange={handleOnChange}
      />
      <Button 
        onClick={handleSearch}
        disabled={disable}
        className='absolute right-0 top-0 p-[4px] flex justify-center items-center h-[50px] w-[50px] max-md:h-10 max-md:w-10'
      >
        <Image 
          src={'/root/search.png'}
          alt='search-btn'
          width={20} height={20}
          className='bg-customGreen-400 rounded-[4px] w-full h-full p-3 max-md:p-2'
        />
      </Button>
      
      {
        searchResults &&
        <div className='flex flex-col absolute top-[60px] max-md:top-[50px] left-0 w-full bg-customWhite-200 z-50 rounded-lg overflow-hidden drop-shadow-default'>
          {
            searchResults.map((result: AutoCompleteResponse, index: number) => (
              <p 
                key={index}
                onClick={() => handleOnClick(result)}
                className='w-full px-3 py-2 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:bg-customWhite-100'>
                {result.text.primary}
              </p>
            ))
          }
        </div>
      }
    </div> 
  )
}
