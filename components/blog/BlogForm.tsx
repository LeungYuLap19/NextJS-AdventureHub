'use client'
import { blogFormSchema, convertImageToBase64 } from '@/lib/utils'
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
import { createBlog, uploadImage } from '@/lib/actions/firebaseBlog';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { getFromCookies } from '@/lib/actions/cookies.action';
import AddPlaceTag from './AddPlaceTag';

export default function BlogForm() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [placeTags, setPlaceTags] = useState<AutoCompleteResponse[]>([]);
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
    const bid = crypto.randomUUID();
    let imgUrl = null;
    if (values.cover) {
      const base64 = await convertImageToBase64(values.cover);
      imgUrl = await uploadImage({ image: base64, fileName: 'blogs', bid });
    }

    const tags = placeTags.map(tag => tag.text.primary);
    const done = await createBlog({
      bid: bid,
      publishTime: new Date(),
      cover: imgUrl,
      article: values.article.replace(/\n/g, '<br/>'),
      title: values.title,
      tags: tags,
    });
    if (done) {
      router.push('/blog');
      toast({
        title: `Blog Created ∙ ${values.title}`,
        description: `${new Date().toDateString()}`,
      });
    }
    else {
      setLoading(false);
      toast({
        title: `Error Creating Blog`,
      });
    }
  };

  const MAX_FILE_SIZE = 5000000;
  const [imageUrl, setImgUrl] = useState<string | null>(null);
  const coverFile = form.watch('cover');
  useEffect(() => {
    if (coverFile) {
      if (coverFile.size > MAX_FILE_SIZE) {
        toast({
          title: `Max image size is 5mb.`,
        });
        setImgUrl(null);
      } 
      else {
        const url = URL.createObjectURL(coverFile);
        setImgUrl(url);
      }
    }
    else {
      setImgUrl(null);
    }
  }, [coverFile]);

  const handleClearFile = () => {
    form.setValue('cover', undefined);
  }

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getFromCookies<UserData>('userData');
      if (userData) {
        setUserData(userData);
      }
    };
    getUserData();
  }, []);

  const removeTag = (selected: AutoCompleteResponse) => {
    const index = placeTags.findIndex(tag => tag.text.primary === selected.text.primary);
    if (index !== -1) {
      const newPlaceTags = [...placeTags];
      newPlaceTags.splice(index, 1);
      setPlaceTags(newPlaceTags);
    }
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
        {/* place tags */}
        <div className='w-full flex flex-wrap gap-2'>
          {
            placeTags.length > 0 &&
            placeTags.map((place, index) => (
              <div 
                onClick={() => {removeTag(place)}}
                key={index} 
                className='text-xs flex gap-1 items-center font-semibold px-4 py-2 rounded-full text-customBlack-300 border border-customBlack-300 cursor-pointer'
              >
                <p>{place.text.primary}</p> 
                <Image 
                  src={'/root/close.svg'}
                  alt='remove tag'
                  width={14} height={14}
                />
              </div>
            ))
          }
          <AddPlaceTag placeTags={placeTags} setPlaceTags={setPlaceTags} />
        </div>
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
