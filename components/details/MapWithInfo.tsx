import { cn } from '@/lib/utils'
import { MapWithInfoProps } from '@/types/components'
import { APIProvider, Map as GoogleMap, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps'
import React, { useState } from 'react'
import Photo from '../discover/Photo';
import { useRouter } from 'next/navigation';
import { storeToLocalstorage } from '@/lib/actions/localStorage.actions';

export default function MapWithInfo({ type, planner, places, position }: MapWithInfoProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<PlannerPlace | null>(null);
  const router = useRouter();
  const handleOnClick = () => {
    if (selected) {
      storeToLocalstorage<CategorizedResultsItem>('plannerPlace', [{label: '', results: [selected.place]}]);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      router.push(`${baseUrl}discover/details?id=${selected?.place.fsq_id}`, { scroll: false });  
    }
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
      <div className={cn('md:max-w-[450px] rounded-lg bg-customBlack-100 overflow-hidden', {
        '!max-w-full !h-full md:!max-w-none !aspect-auto': type === 'planner',
        'aspect-square': type === 'place'
      })}>
        <GoogleMap
          className='h-planner-details-custom'
          defaultZoom={type === 'planner' ? 10 : 15}
          defaultCenter={
            (places && places[0] && places[0].geoData) ? 
            places[0].geoData : 
            position ? 
            position : 
            planner ? 
            {
              lat: planner?.country.geo.center.latitude,
              lng: planner?.country.geo.center.longitude
            } : 
            undefined
          }
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
        >
          {
            places ?
            places.map((data) => (
              <AdvancedMarker 
                onClick={() => {
                  setOpen(true);
                  setSelected(data);
                }}
                key={data.place.fsq_id} 
                position={data.geoData}
              />
            )) :
            position ?
            <AdvancedMarker 
              position={position}
            /> :
            planner ?
            <AdvancedMarker position={
              {
                lat: planner?.country.geo.center.latitude,
                lng: planner?.country.geo.center.longitude
              }
            } /> :
            <></>
          }

          {
            open && selected &&
            <InfoWindow 
              
              onCloseClick={() => setOpen(false)} 
              position={selected.geoData}
            >
              <div className='p-[12px] pl-0'>
                <div className='h-[100px] max-md:h-[80px] w-fit bg-customWhite-200 flex gap-4'>
                  <div className='h-full md:min-w-[100px] md:max-w-[200px] max-md:w-[100px] flex flex-col justify-between'>
                    <div className='flex flex-col gap-1'>
                      <p className='font-semibold text-base line-clamp-1'>{selected.place.name}</p>
                      <p className='line-clamp-1'>
                        {
                          selected.place.categories.map((category: Category, index: number) => (
                            <React.Fragment key={category.id}>
                              {index > 0 && ', '}
                              {category.short_name}
                            </React.Fragment>
                          )) 
                        }
                      </p>
                    </div>
                    <p>
                      {selected.place.rating / 2} / 5 <span className='text-yellow-400 text-base'>★</span>
                    </p>
                  </div>

                  <div 
                    onClick={handleOnClick}
                    className='h-full aspect-square bg-customBlack-100 relative flex-shrink-0 rounded-md overflow-hidden cursor-pointer'
                  >
                    {
                      selected.place.photo &&
                      <Photo
                        displayName={selected.place.name} 
                        imgUrl={selected.place.photo} 
                        morePhoto={false}     
                      /> 
                    }
                  </div>
                </div>
              </div>
            </InfoWindow>
          }
        </GoogleMap>
      </div>
    </APIProvider>
  )
}
