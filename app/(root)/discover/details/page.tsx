'use client'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils';
import PhotosCard from '@/components/discover/PhotosCard';
import Details from '@/components/details/Details';
import Reviews from '@/components/details/Reviews';
import { getResultsItemById } from '@/lib/actions/localStorage.actions';
import { placeDetails } from '@/lib/actions/fourSquareAPI';
import { placeDetailsFields } from '@/constants';
import { textSearch } from '@/lib/actions/googleAPI';

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [type, setType] = useState<'details' | 'reviews'>('details');
  const [resultsItem, setResultsItem] = useState<ResultsItem | null>(null);
  const [itemDetails, setItemDetails] = useState<PlaceDetails | null>(null);
  const [extraData, setExtraData] = useState<ExtraData | null>(null);

  const getPlaceDetails = async () => {
    const data = await placeDetails({ fsq_id: id!, fields: placeDetailsFields });
    setItemDetails(data);
  }

  const getExtraData = async () => {
    if (resultsItem && itemDetails) {
      const data = await textSearch({ 
        name: resultsItem?.name, 
        latitude: itemDetails?.geocodes.main.latitude, 
        longitude: itemDetails?.geocodes.main.longitude, 
        formatted_address: itemDetails?.location.formatted_address 
      });
      setExtraData(data);
    }
  }

  // do fetch reviews from google place
  useEffect(() => {
    const fromDefault = getResultsItemById('defaultItems', id!);
    const fromResults = getResultsItemById('resultsItems', id!);
    setResultsItem(fromDefault || fromResults);

    getPlaceDetails();
  }, [id]);

  useEffect(() => {
    if (resultsItem && itemDetails) {
      getExtraData();
    }
  }, [resultsItem, itemDetails]);

  return (
    <div className='flex 3xl:justify-center gap-8 w-full max-lg:pb-28 max-md:flex-col pt-5'>
      {
        resultsItem &&
        <>
          <PhotosCard item={resultsItem} photos={itemDetails?.photos || []}/>

          <div className='w-full'>
            <Tabs 
              defaultValue='details' 
              className='flex flex-col items-start max-md:items-center w-full relative'
            >
              <TabsList className='absolute top-0 left-0 md:justify-start w-full p-0 mb-7 bg-customWhite-100 z-40 rounded-none'>
                <TabsTrigger 
                  value='details'
                  className={cn('details-tab', {
                    'details-tab-active': type === 'details'
                  })}
                  onClick={() => setType('details')}
                >
                  Details
                </TabsTrigger>

                <TabsTrigger 
                  value='reviews'
                  className={cn('details-tab', {
                    'details-tab-active': type === 'reviews'
                  })}
                  onClick={() => setType('reviews')}
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className='details-content'>
                {
                  itemDetails &&
                  <Details itemDetails={itemDetails} extraData={extraData} />
                }
              </TabsContent>
              <TabsContent value="reviews" className='details-content'>
                {
                  extraData?.reviews ?
                  <Reviews reviews={extraData?.reviews} /> :
                  'No Reviews'
                }
              </TabsContent>
            </Tabs>
          </div>
        </>
      }
    </div>
  )
}
