'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import Subtitle from '../discover/Subtitle'
import UserBadge from './UserBadge';
import Image from 'next/image';
import AnimatedCounter from './AnimatedCounter';
import { Textarea } from '../ui/textarea';
import Review from '../details/Review';
import { useSearchParams } from 'next/navigation';
import { addBlogComment, getBlogByBid, likeBlog } from '@/lib/actions/firebaseBlog';
import Photo from '../discover/Photo';
import { Button } from '../ui/button';
import { useGetBlogsDetails } from '@/lib/hooks/useGetBlogsDetails';
import { toast } from '../ui/use-toast';

const BlogDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { details, liked } = useGetBlogsDetails(id || '');
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const getBlogDetails = async (bid: string) => {
      const blog = await getBlogByBid(bid);
      setBlog(blog);
    }
    id && getBlogDetails(id);
  }, [id]);

  const handleLike = async () => {
    if (id) {
      const done = await likeBlog(id);
      if (!done) {
        toast({
          description: 'Like Blog Error.'
        });
      }
    }
  }

  const handleSubmit = async () => {
    setLoading(true);
  
    if (!id) {
      toast({
        description: 'User Data Error.'
      });
      setLoading(false);
      return;
    }
  
    if (!inputRef.current || inputRef.current.value.trim() === '') {
      toast({
        description: 'Enter your thought before submitting.'
      });
      setLoading(false);
      return;
    }
  
    const done = await addBlogComment({
      bid: id,
      publishTime: new Date(),
      text: inputRef.current.value.trim()
    });
  
    if (!done) {
      toast({
        description: 'Failed to add comment.'
      });
    }
    else {
      inputRef.current.value = '';
    }
  
    setLoading(false);
  }
  
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
            <UserBadge 
              userData={blog.userData} 
              publishTime={blog.publishTime} 
              views={details ? details.views : undefined} 
            />

            {/* article */}
            <p dangerouslySetInnerHTML={{ __html: blog.article }} />
          </div>
        </>  
      }
      
      <div className='flex flex-col gap-6'>
        {/* community */}
        <div className='w-full flex gap-6'>
          <div className='flex gap-1 items-center'>
            <div className='cursor-pointer' onClick={handleLike}>
              <Image 
                src={`${liked ? '/root/heart-filled.svg' : '/root/heart.svg'}`}
                alt='like'
                height={24} width={24}
              />
            </div>
            
            <div className='flex'>
              <AnimatedCounter amount={ details ? details.likes.length : 0 } />
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
              <AnimatedCounter amount={ details ? details.comments.length : 0 } /> 
              &nbsp;Comments
            </div>
          </div>
        </div>

        <Subtitle title={'Community'} />
        <Textarea 
          ref={inputRef}
          className='text-base bg-transparent text-customBlack-300' 
          placeholder="Write your thought here…" 
        />
        <Button
          disabled={loading}
          onClick={handleSubmit}
          className='h-10 green-gradient text-customWhite-200 w-fit'
        >
          Comment
        </Button>
        <div className='content-details lg:mb-20 mt-10'>
          {
            details && details.comments.length > 0 &&
            details.comments.map((comment, index) => (
              <Review 
                key={index}
                comment={comment}
              />
            ))
          }
        </div> 
      </div>
    </div>
  )
}

const BlogDetails = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <BlogDetailsPage />
  </Suspense>
);

export default BlogDetails;