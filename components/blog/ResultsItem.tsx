'use client'
import { cn, formUrlQuery } from '@/lib/utils'
import React, { Suspense } from 'react'
import Photo from '../discover/Photo'
import { useRouter, useSearchParams } from 'next/navigation';
import { addBlogView } from '@/lib/actions/firebaseBlog';

const ResultsItemPage = ({ type, blog }: { type: 'recommend' | 'popular'; blog: Blog }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleOnClick = async () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      query: {
        id: blog.bid
      },
      extraRoute: '/details'
    });
    const done = await addBlogView(blog.bid);
    done && router.push(newUrl, { scroll: false });
  }

  return (
    <div
      onClick={handleOnClick} 
      className={cn('flex-shrink-0 relative bg-customWhite-200 rounded-lg overflow-hidden cursor-pointer', {
        'sm:w-full sm:pt-[56.8%] max-sm:h-full max-sm:pl-[70%]': type === 'recommend',
        'w-full h-fit': type === 'popular'
      })}
    >
      <div className={cn('text-white', {
        'absolute inset-0': type ==='recommend',
        'w-full h-fit': type === 'popular'
      })}>
        <div className={cn('w-full bg-customBlack-100', {
          'relative h-full flex': type === 'recommend',
          'flex flex-col h-fit': type === 'popular'
        })}>
          {/* photo */}
          {
            type === 'popular' ?
            <div className='h-full aspect-square relative'>
              {
                blog.cover &&
                <Photo 
                  displayName={blog.title}
                  imgUrl={blog.cover}
                  morePhoto={false}
                />
              }
            </div> :
            blog.cover ?
            <Photo
              displayName={blog.title}
              imgUrl={blog.cover}
              morePhoto={true}
            /> :
            <></>
          }
      
          {
            type === 'recommend' ?
            <div className='absolute left-0 bottom-0 w-full p-4 pl-5 flex flex-col gap-2'>
              <p className='text-lg font-bold line-clamp-1'>{blog.title}</p>
              <div className='flex gap-2 items-center'>
                <div className='flex justify-center items-center w-fit aspect-square green-gradient text-sm text-customWhite-200 rounded-full flex-shrink-0 h-7'>
                  {blog.userData.username[0].toUpperCase()}
                </div>
                <p className='text-xs line-clamp-1'>{blog.userData.username}</p>
              </div>
            </div> :
            <div className='h-full bg-customWhite-200 text-customBlack-300 flex flex-col gap-4 justify-between pl-3 pr-4 pt-2 pb-3'>
              <div className='flex flex-col'>
                <p className='line-clamp-1'>{blog.title}</p>
                <p className='text-xs line-clamp-2 text-customBlack-100 w-[90%]'>
                  {blog.article}
                </p>
              </div>
              
              <div className='flex gap-2 items-center'>
                <div className='flex justify-center items-center w-fit aspect-square green-gradient text-sm text-customWhite-200 rounded-full flex-shrink-0 h-7'>
                  {blog.userData.username[0].toUpperCase()}
                </div>
                <p className='text-xs line-clamp-1'>{blog.userData.username}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

const ResultsItem = ({ type, blog }: { type: 'recommend' | 'popular'; blog: Blog }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResultsItemPage type={type} blog={blog} />
  </Suspense>
)

export default ResultsItem;