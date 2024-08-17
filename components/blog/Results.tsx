'use client'
import React from 'react'
import Subtitle from '../discover/Subtitle'
import ResultsItem from './ResultsItem'
import { useGetBlogs } from '@/lib/hooks/useGetBlogs';

export default function Results() {
  const { myBlogs, recommendedBlogs, popularBlogs, blogsResults } = useGetBlogs();

  return (
    <div className='flex flex-col w-full gap-7'>
      {
        blogsResults.length > 0 &&
        <>
          <Subtitle title={'Search Results'} />
          <div className='w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4 3xl:grid-cols-6'>
            {
              blogsResults.map((blog) => (
                <ResultsItem key={blog.bid} type='popular' blog={blog} />
              ))
            }
          </div>
        </>
      }

      {
        recommendedBlogs.length > 0 && blogsResults.length == 0 &&
        <>
          <Subtitle title={'Recommendation'} />
          <div className='w-full grid grid-cols-3 max-lg:grid-cols-2 gap-4
          max-sm:grid-cols-none max-sm:h-[80vw] max-sm:flex max-sm:overflow-auto'>
            {
              recommendedBlogs.map((blog) => (
                <ResultsItem key={blog.bid} type='recommend' blog={blog} />
              ))
            }
          </div>
        </>
      }
      
      {
        popularBlogs.length > 0 && blogsResults.length == 0 &&
        <>
          <Subtitle title={'Popular Blogs'} />
          <div className='w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4 3xl:grid-cols-6'>
            {
              popularBlogs.map((blog) => (
                <ResultsItem key={blog.bid} type='popular' blog={blog} />
              ))
            }
          </div>
        </>
      }

      {
        myBlogs.length > 0 && blogsResults.length == 0 &&
        <>
          <Subtitle title={'Your Blogs'} />
          <div className='w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4 3xl:grid-cols-6'>
            {
              myBlogs.map((blog) => (
                <ResultsItem key={blog.bid} type='popular' blog={blog} />
              ))
            }
          </div>
        </>
      }
    </div>
  )
}
