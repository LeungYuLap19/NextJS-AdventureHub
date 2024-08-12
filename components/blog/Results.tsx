'use client'
import React from 'react'
import Subtitle from '../discover/Subtitle'
import ResultsItem from './ResultsItem'
import { useGetBlogs } from '@/lib/hooks/useGetBlogs';

export default function Results() {
  const { myBlogs } = useGetBlogs();

  const testingBlog: Blog = {
    bid: '123',
    title: 'Testing Blog Title',
    article: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Donec metus pharetra proin pretium pharetra purus curabitur. Et turpis orci netus gravida libero. Adipiscing ante ac eu blandit sem, enim suscipit at. Nascetur nulla per magna pulvinar maximus. Aliquet viverra scelerisque est mattis luctus porta suscipit. Faucibus fringilla integer ridiculus, fusce proin cursus. Massa rutrum quis mattis justo mauris aptent justo cursus. Malesuada penatibus felis phasellus etiam dolor mi magna.',
    cover: '/root/testing-img.jpg',
    publishTime: new Date(),
    userData: {
      uid: '',
      username: 'Testing User',
      city: '',
      email: ''
    }
  }

  return (
    <div className='flex flex-col w-full gap-7'>
      <Subtitle title={'Recommendation'} />
      <div className='w-full grid grid-cols-3 max-lg:grid-cols-2 gap-4
      max-sm:grid-cols-none max-sm:h-[80vw] max-sm:flex max-sm:overflow-auto'>
        {
          Array.from({ length: 6 }, (_, index) => (
            <ResultsItem key={index} type='recommend' blog={testingBlog} />
          ))
        }
      </div>

      <Subtitle title={'Popular Blogs'} />
      <div className='w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4 3xl:grid-cols-6'>
        {
          Array.from({ length: 12 }, (_, index) => (
            <ResultsItem key={index} type='popular' blog={testingBlog} />
          ))
        }
      </div>

      <Subtitle title={'Your Blogs'} />
      <div className='w-full grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4 3xl:grid-cols-6'>
        {
          myBlogs.map((blog) => (
            <ResultsItem key={blog.bid} type='popular' blog={blog} />
          ))
        }
      </div>
    </div>
  )
}
