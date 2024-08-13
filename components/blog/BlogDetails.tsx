'use client'
import React, { useEffect, useState } from 'react'
import Subtitle from '../discover/Subtitle'
import UserBadge from './UserBadge';
import Image from 'next/image';
import AnimatedCounter from './AnimatedCounter';
import { Textarea } from '../ui/textarea';
import Review from '../details/Review';
import { useSearchParams } from 'next/navigation';
import { getBlogByBid } from '@/lib/actions/firebaseBlog';
import Photo from '../discover/Photo';
import { Button } from '../ui/button';

export default function BlogDetails({ userData }: { userData: UserData }) {
  // testing userData
  const [liked, setLiked] = useState<boolean>(false);
  const testComment: BlogComment = {
    displayName: 'Jimmy',
    publishTime: new Date(),
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempor orci eu lobortis elementum nibh. Suspendisse sed nisi lacus sed viverra tellus in hac habitasse. Eget lorem dolor sed viverra ipsum nunc. Et tortor consequat id porta nibh venenatis cras sed felis.'
  };

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const getBlogDetails = async (bid: string) => {
      const blog = await getBlogByBid(bid);
      console.log(blog);
      setBlog(blog);
    }
    
    id && getBlogDetails(id);
  }, [id]);

  return (
    <div className='flex flex-col gap-12 max-sm:gap-8 max-lg:pb-28 pt-5'>
      {
        blog &&
        <>
          {/* photo */}
          <div className='relative w-full pb-[30%] max-sm:pb-[80%] rounded-lg bg-customBlack-100 overflow-hidden'>
            {
              blog.cover &&
              <Photo 
                displayName={blog.title} 
                imgUrl={blog.cover} 
                morePhoto={false}              
              />
            }
          </div>

          <div className='flex flex-col gap-6'>
            {/* title */}
          <Subtitle title={blog.title} /> 

            {/* user */}
            <UserBadge userData={blog.userData} publishTime={blog.publishTime} />

            {/* article */}
            <p dangerouslySetInnerHTML={{ __html: blog.article }} />
          </div>
        </>  
      }
      
      <div className='flex flex-col gap-6'>
        {/* community */}
        <div className='w-full flex gap-6'>
          <div className='flex gap-1 items-center'>
            <div className='cursor-pointer' onClick={() => setLiked(!liked)}>
              <Image 
                src={`${liked ? '/root/heart-filled.svg' : '/root/heart.svg'}`}
                alt='like'
                height={24} width={24}
              />
            </div>
            
            <div className='flex'>
              {/* testing amount */}
              <AnimatedCounter amount={ 0 } />
              &nbsp;Likes
            </div>
          </div>

          <div className='flex gap-1 items-center'>
            <Image 
              src={'/root/comments.svg'}
              alt='comments'
              height={24} width={24}
            />
            <div className='flex'>
              {/* testing amount */}
              <AnimatedCounter amount={ 0 } /> 
              &nbsp;Comments
            </div>
          </div>
        </div>

        <Subtitle title={'Community'} />
        <Textarea className='text-base bg-transparent text-customBlack-300' placeholder="Write your thought here…" />
        <Button
          className='h-10 green-gradient text-customWhite-200 w-fit'
        >
          Comment
        </Button>
        <div className='content-details'>
          {/* testing commments */}
          {/* {
            Array.from({ length: 6 }, (_, index) => (
              <Review 
                key={index}
                comment={testComment}
              />
            ))
          } */}
        </div> 
      </div>
    </div>
  )
}
