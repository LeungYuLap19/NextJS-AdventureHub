'use client'
import { blogFormSchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';
import { Button } from '../ui/button';
import UserBadge from './UserBadge';
import CustomInput from './CustomInput';
import Photo from '../discover/Photo';
import Image from 'next/image';
import { createBlog } from '@/lib/actions/firebaseBlog';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

export default function BlogForm({ userData }: { userData: UserData }) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const formSchema = blogFormSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      article: '',
      cover: undefined
    }
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const done = await createBlog({
      bid: crypto.randomUUID(),
      publishTime: new Date(),
      cover: values.cover,
      article: values.article,
      title: values.title
    });
    if (done) {
      router.push('/blog');
      toast({
        title: `Blog Created ∙ ${values.title}`,
        description: `${new Date().toDateString()}`,
      });
    }
    else {
      toast({
        title: `Error Creating Blog`,
      });
    }
    setLoading(false);
  };

  const [imageUrl, setImgUrl] = useState<string | null>(null);
  const coverFile = form.watch('cover');
  useEffect(() => {
    if (coverFile) {
      const url = URL.createObjectURL(coverFile);
      setImgUrl(url);
    }
    else {
      setImgUrl(null);
    }
  }, [coverFile]);

  const handleClearFile = () => {
    form.setValue('cover', undefined);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8 max-lg:pb-28 pt-5'>
        {/* photo */}
        <div className='relative w-full pb-[30%] max-sm:pb-[80%] rounded-lg bg-customBlack-100 overflow-hidden'>
          {
            imageUrl ?
            <>
              <Photo
                displayName='uploaded-photo'
                imgUrl={imageUrl}
                morePhoto={false}
              />
              <div 
                onClick={handleClearFile}
                className='absolute left-1/2 bottom-3 transform -translate-x-1/2 cursor-pointer bg-customWhite-100 rounded-full overflow-hidden p-2'
              >
                <Image
                  src={'/root/close.svg'}
                  alt='clear-image'
                  width={20} height={20}
                />
              </div>
            </> :
            <CustomInput 
              control={form.control}
              label='Upload cover picture'
              name='cover'
              placeholder=''
            />
          }
        </div>
        {/* title */}
        <div className='w-full flex flex-col gap-2'>
          <CustomInput 
            control={form.control}
            label='Enter Your Blog Title'
            name='title'
            placeholder='Enter Your Blog Title'
          />
        </div>
        {/* user */}
        { userData && <UserBadge userData={userData} /> }
        {/* article */}
        <CustomInput 
          control={form.control}
          label='Share your adventure stories here…'
          name='article'
          placeholder='Share your adventure stories here…'
        />

        {/* button */}
        <Button 
          type='submit'
          disabled={loading}
          className='w-fit h-10 green-gradient text-customWhite-200'
        >
          Post
        </Button>
      </form>
    </Form>
  )
}
