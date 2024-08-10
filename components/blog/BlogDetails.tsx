'use client'
import React, { useState } from 'react'
import Subtitle from '../discover/Subtitle'
import UserBadge from './UserBadge';
import Image from 'next/image';
import AnimatedCounter from './AnimatedCounter';
import { Textarea } from '../ui/textarea';
import Review from '../details/Review';

export default function BlogDetails({ userData }: { userData: UserData }) {
  // testing userData
  const [liked, setLiked] = useState<boolean>(false);
  const testComment: BlogComment = {
    displayName: 'Jimmy',
    publishTime: new Date(),
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor orci eu lobortis elementum nibh. Suspendisse sed nisi lacus sed viverra tellus in hac habitasse. Eget lorem dolor sed viverra ipsum nunc. Et tortor consequat id porta nibh venenatis cras sed felis.'
  };

  return (
    <div className='flex flex-col gap-8 max-lg:pb-28 pt-5'>
      {/* photo */}
      <div className='relative w-full pb-[30%] max-sm:pb-[80%] rounded-lg bg-customBlack-100 overflow-hidden'>

      </div>
      {/* title */}
      <Subtitle title={'Blog Name - Lorem ipsum odor amet, consectetuer adipiscing elit.'} /> 

      {/* user */}
      { userData && <UserBadge userData={userData} /> }

      {/* article */}
      <p>
        article placeholder 
      </p>

      {/* community */}
      <div className='w-full flex gap-6'>
        <div className='flex gap-1 items-center'>
          <div className='cursor-pointer' onClick={() => setLiked(!liked)}>
            <Image 
              src={`${liked ? '/root/heart-filled.svg' : '/root/heart.svg'}`}
              alt='like'
              height={28} width={28}
            />
          </div>
          
          <div className='flex'>
            {/* testing amount */}
            <AnimatedCounter amount={ 1000 } />
            &nbsp;Likes
          </div>
        </div>

        <div className='flex gap-1 items-center'>
          <Image 
            src={'/root/comments.svg'}
            alt='comments'
            height={28} width={28}
          />
          <div className='flex'>
            {/* testing amount */}
            <AnimatedCounter amount={ 1000 } /> 
            &nbsp;Comments
          </div>
        </div>
      </div>

      <Subtitle title={'Community'} />
      <Textarea className='text-base bg-transparent text-customBlack-300' placeholder="Write your thought here…" />
      <div className='content-details'>
        {/* testing commments */}
        {
          Array.from({ length: 6 }, (_, index) => (
            <Review 
              key={index}
              comment={testComment}
            />
          ))
        }
      </div> 
    </div>
  )
}
