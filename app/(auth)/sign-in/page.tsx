import AuthForm from '@/components/auth/AuthForm'
import React from 'react'

export default function page() {
  return (
    <div className='auth-container'>
      <AuthForm type='sign-in' />
    </div>
  )
}
