'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils';
import PhotosCard from '@/components/discover/PhotosCard';
import Details from '@/components/details/Details';
import Reviews from '@/components/details/Reviews';

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [type, setType] = useState<'details' | 'reviews'>('details');

  const tempItem = {
    displayName: 'Place Name',
    types: 'place types',
    rating: 5.0, 
  }

  return (
    <div className='flex 3xl:justify-center gap-8 w-full max-lg:pb-28 max-md:flex-col pt-5'>
      <PhotosCard item={tempItem} />

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
            <Details />
          </TabsContent>
          <TabsContent value="reviews" className='details-content'>
            <Reviews />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
