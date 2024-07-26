import Image from 'next/image'
import React from 'react'

export default function SectionWithIcon({ imgUrl, text }: { imgUrl: string; text: string }) {
  return (
    <div className='flex items-center gap-2 h-[30px] mb-[-25px] w-fit'>
      <Image 
        src={imgUrl}
        alt='location'
        height={16} width={16}
      />
      <p className='text-sm text-customBlack-200 line-clamp-1'>
        {text}
      </p>
    </div>
  )
}
