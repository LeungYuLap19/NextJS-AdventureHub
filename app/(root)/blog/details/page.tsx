import Blog from '@/components/blog/Blog'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

export default function page() {
  return (
    <>
      <Blog type='details' />
      <Toaster />
    </>
  )
}
