import { Rating } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function Review({ review, comment }: { review?: Review; comment?: BlogComment }) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2 items-center'>
        {
          review ?
          <Image 
            src={review.authorAttribution.photoUri}
            alt={review.authorAttribution.displayName}
            height={50} width={50}
            className='rounded-full flex-shrink-0 h-[50px]'
          /> :
          comment ?
          <div className='flex justify-center items-center text-xl h-12 aspect-square green-gradient text-customWhite-200 rounded-full flex-shrink-0 max-sm:h-10'>
            {comment.displayName[0]}
          </div> :
          <></>
        }
        
        <div>
          <p className='max-2xl:text-sm font-semibold'>
            { review ? review.authorAttribution.displayName + ' ∙ ' : comment ? comment.displayName + ' ∙ ': ''} 
            <span className='font-normal'>
              { review ? review.relativePublishTimeDescription : comment ? comment.publishTime.toLocaleDateString() : ''}
            </span>
          </p>
          {
            review &&
            <Rating
              name="half-rating-read" 
              defaultValue={review.rating} 
              precision={0.1} 
              size="small" readOnly 
            />
          }
        </div>
      </div>

      { review && review.originalText && <p className='max-2xl:text-sm'>{review.originalText.text}</p> }
      { comment && <p className='max-2xl:text-sm'>{comment.text}</p> }
    </div>
  )
}
