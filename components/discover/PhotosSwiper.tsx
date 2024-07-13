import Image from 'next/image';
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import { Button } from '../ui/button';

export default function PhotosSwiper({ photos, setOpen }: { photos: PlacePhoto[], setOpen: (open: boolean) => void }) {
  return (
    <div className='fixed top-0 left-0 h-screen w-screen bg-customBlack-100 bg-opacity-70 z-[98]'>
      <Swiper
        slidesPerView={1}
        speed={500}
        loop={false}
        className='h-full w-full'
        navigation={true} 
        modules={[Navigation]} 
      >
        {
          photos.map((photo: PlacePhoto) => (
            <SwiperSlide key={photo.id} className='!h-full !w-full !flex !items-center !justify-center'>
              <div className='relative w-full h-[85%]'>
                <Image
                  src={photo.prefix + 'original' + photo.suffix}
                  alt={photo.id}
                  fill={true}
                  style={{objectFit: "contain"}}
                />
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>

      <Button 
        onClick={() => setOpen(false)}
        className='absolute bottom-7 left-[50%] -translate-x-[50%] bg-customWhite-200 rounded-xl h-[60px] aspect-square p-0 z-[99] drop-shadow-default'
      >
        <Image 
          src={'/root/close.svg'}
          alt='close'
          height={30} width={30}
          className='h-2/4 w-2/4'
        />
      </Button>
    </div>
  )
}
