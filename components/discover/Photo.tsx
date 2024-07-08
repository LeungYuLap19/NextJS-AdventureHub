import Image from 'next/image'
import React from 'react'

export default function Photo({ displayName, imgUrl, morePhoto=false }: PhotoProps) {
  return (
    <Image 
      className={`${morePhoto && 'brightness-50'}`}
      src={imgUrl}
      alt={displayName}
      fill={true}
      style={{objectFit: 'cover', objectPosition: 'center'}}
    />
  )
}
