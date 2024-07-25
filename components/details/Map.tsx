import React from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';
import { cn } from '@/lib/utils';

interface LatLng {
  lat: number;
  lng: number;
}

interface MapProps {
  positions: LatLng[];
  type: 'place' | 'planner';
  setSelected?: (selected: LatLng) => void;
}

export default function Map({ positions, type, setSelected }: MapProps) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
      <div className={cn('md:max-w-[450px] rounded-lg bg-customBlack-100 overflow-hidden', {
        '!max-w-full !h-full md:!max-w-none !aspect-auto': type === 'planner',
        'aspect-square': type === 'place'
      })}>
        <GoogleMap
          className='h-planner-details-custom'
          defaultZoom={type === 'planner' ? 10 : 15}
          defaultCenter={positions[0]}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
        >
          {positions.map((position, index) => (
            <AdvancedMarker 
              onClick={() => 
                {
                  if (setSelected) {
                    setSelected(position)
                  }
                }
              } 
              key={index} 
              position={position} 
            />
          ))}
        </GoogleMap>
      </div>
    </APIProvider>
  );
}

