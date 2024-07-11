import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function SocialMediaLink({ type, name }: SocialMediaLinkProps) {
  
  return (
    <a 
      target='_blank'
      rel='noopener noreferrer'
      href={
            type === 'facebook_id' ? 
            `https://www.facebook.com/${name}` :
            type === 'instagram' ?
            `https://www.instagram.com/${name}` :
            `https://twitter.com/${name}`
          }
      className='flex gap-2 items-center px-2 py-1 bg-customGreen-400 text-customWhite-200 rounded-lg h-fit w-fit max-2xl:text-sm'
    >
      <Image 
        src={
          type === 'facebook_id' ?
          '/root/facebook.svg' :
          type === 'instagram' ?
          '/root/instagram.svg' :
          '/root/twitter.svg'
        }
        alt={type}
        height={15} width={15}
        className='invert'
      />
      {
        type === 'facebook_id' ?
        'Facebook' :
        type === 'instagram' ?
        'Instagram' :
        'X / Twitter'
      }
    </a>
  )
}
