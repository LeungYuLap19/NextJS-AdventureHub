'use client'
import React, { useState, useEffect } from 'react'
import { Input } from '../ui/input'

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      const event = new CustomEvent("blogsSearch", { detail: searchTerm.trim() });
      window.dispatchEvent(event);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div className='md:w-[50%] max-lg:flex-grow flex-shrink-0 relative'>
      <Input
        type='search'
        className='border border-customBlack-100 bg-customWhite-100 placeholder:text-customBlack-100 h-[50px] max-md:h-10'
        placeholder={'Search blogs...'}
        onChange={handleOnChange}
      />
    </div>
  )
}
