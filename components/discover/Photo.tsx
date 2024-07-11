import Image from 'next/image'
import React from 'react'

export default function Photo({ displayName, imgUrl, morePhoto=false }: PhotoProps) {
  return (
    <Image 
      className={`${morePhoto && 'brightness-50'}`}
      src={imgUrl}
      alt={displayName}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
      fill={true}
      style={{objectFit: 'cover', objectPosition: 'center'}}
      placeholder='empty'
      priority={true}
    />
  )
}
