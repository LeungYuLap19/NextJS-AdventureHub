import React from 'react'
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';
import { cn } from '@/lib/utils';

interface MapProps {
  latitude: number;
  longitude: number;
  type: 'place' | 'planner'
}

export default function Map({ latitude, longitude, type }: MapProps) {
  const position = { lat: latitude, lng: longitude };
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
      <div className={cn('md:max-w-[450px] rounded-lg bg-customBlack-100 overflow-hidden', {
        'max-w-full h-full md:!max-w-none !aspect-auto': type === 'planner',
        'aspect-square': type === 'place'
      })}>
        <GoogleMap
          defaultZoom={15}
          defaultCenter={position}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
        >
          <AdvancedMarker position={position} />
        </GoogleMap>
      </div>
    </APIProvider>
    
  )
}
