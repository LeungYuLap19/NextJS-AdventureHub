import { Rating } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function Review({ review }: { review: Review }) {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-2 items-center'>
                <Image 
                    src={review.authorAttribution.photoUri}
                    alt={review.authorAttribution.displayName}
                    height={50} width={50}
                    className='rounded-full flex-shrink-0 h-[50px]'
                />
                <div>
                    <p className='max-2xl:text-sm font-semibold'>{review.authorAttribution.displayName + ' ∙ '} <span className='font-normal'>{review.relativePublishTimeDescription}</span></p>
                    <Rating
                        name="half-rating-read" 
                        defaultValue={review.rating} 
                        precision={0.1} 
                        size="small" readOnly 
                    />
                </div>
            </div>

            {
                review.originalText && <p className='max-2xl:text-sm'>{review.originalText.text}</p>
            }
            
        </div>
    )
}
