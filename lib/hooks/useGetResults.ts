import { useEffect, useState } from "react";
import { getFromLocalstorage, storeToLocalstorage } from "../actions/localStorage.actions";
import { nearbySearch, placeSearch } from "../actions/fourSquareAPI";
import { placeSearchFields, searchTabs } from "@/constants";
import { getLatLong } from "../actions/ipifyAPI";

export function useGetResults(type: string | null): { results: CategorizedResultsItem[], getLocation: () => Promise<LatLong | null> } {
  const [results, setResults] = useState<CategorizedResultsItem[]>([]);
  const defaultLabel = 'Popular places around you';

  // search results items update
  const handleResultsUpdated = () => {
    const resultsItems = getFromLocalstorage<CategorizedResultsItem>('resultsItems');
    setResults(resultsItems);
  };
  
  useEffect(() => {
    window.addEventListener('resultsUpdated', handleResultsUpdated);
    return () => {
      window.removeEventListener('resultsUpdated', handleResultsUpdated);
    };
  }, []);

  // default items
  const getDefaultItems = async (latitude: number, longitude: number, noLocation: boolean) => {
    if (noLocation) {
      const location = await getLocation();
      if (location) {
        const { latitude, longitude } = location;
        const data = await placeSearch({
          latitude: latitude, longitude: longitude,
          radius: 30000, categories: searchTabs[0].categories,
          fields: placeSearchFields, sort: 'RELEVANCE', limit: 24
        });
        storeToLocalstorage('defaultItems', [{ label: defaultLabel, results: data }]);
        setResults([{ label: defaultLabel, results: data }]);
      }
      else {
        const data = await nearbySearch({ fields: placeSearchFields, limit: 24 });
        storeToLocalstorage('defaultItems', [{ label: defaultLabel, results: data }]);
        setResults([{ label: defaultLabel, results: data }]);
      }
    }
    else {
      const data = await placeSearch({
        latitude: latitude, longitude: longitude,
        radius: 5000, categories: searchTabs[0].categories,
        fields: placeSearchFields, sort: 'RELEVANCE', limit: 24
      });
      storeToLocalstorage('defaultItems', [{ label: defaultLabel, results: data }]);
      setResults([{ label: defaultLabel, results: data }]);
    }
  }

  const getLocation = async (): Promise<LatLong | null> => {
    const data = await getLatLong();
    return data;
  }

  useEffect(() => {
    const defaultItems = getFromLocalstorage<CategorizedResultsItem>('defaultItems');
    const preivousItems = getFromLocalstorage<CategorizedResultsItem>('resultsItems');

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

  return { results, getLocation };
}