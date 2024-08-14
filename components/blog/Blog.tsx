'use server'
import React from 'react'
import BlogForm from './BlogForm'
import { getFromCookies } from '@/lib/actions/cookies.action';
import BlogDetails from './BlogDetails';

export default async function Blog({ type }: { type: 'details' | 'create' }) {
  const userData = await getFromCookies<UserData>('userData');
  return (
    <div>
      {
        type === 'details' && userData ?
        <BlogDetails userData={userData} />:
        userData ?
        <BlogForm userData={userData} />:
        <></>
      }
    </div>
  )
}
