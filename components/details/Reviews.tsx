import React from 'react'
import Review from './Review'

export default function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className='content-details'>
      {
        reviews &&
        reviews.map((review: Review, index) => (
          <Review key={index} review={review} />
        ))
      }
    </div>
  )
}
