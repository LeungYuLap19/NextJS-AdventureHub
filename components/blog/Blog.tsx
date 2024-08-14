import React from 'react'
import BlogForm from './BlogForm'
import BlogDetails from './BlogDetails';

export default async function Blog({ type }: { type: 'details' | 'create' }) {
  return (
    <div>
      {
        type === 'details' ?
        <BlogDetails /> :
        <BlogForm />
      }
    </div>
  )
}
