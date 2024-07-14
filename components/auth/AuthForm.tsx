'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Logo from '../logo/Logo'
import { authFormSchema } from '@/lib/utils'
import CustomInput from './CustomInput'
import { createAccount, createUser, getUserByUID, signInAccount } from '@/lib/actions/firebaseAuth'
import { storeToCookies } from '@/lib/actions/cookies.action'

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        username: "",
        city: "",
        email: "",
        password: "",
    },
  });
	
  async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		const uid: any = type === 'sign-in' ? await signInAccount({email: values.email, password: values.password}) : 
		await createAccount({email: values.email, password: values.password});
		
		if (uid) {
			if (uid.errorCode) {
				alert(uid.message);
				setLoading(false);
			}
			else  {
				const userData = type === 'sign-in' ? await getUserByUID(uid) : 
				await createUser({ uid: uid, username: values.username!, city: values.city!, email: values.email });
				if (userData) {
					await storeToCookies<UserData>('userData', userData);
					router.push('/discover');
				}
				setLoading(false);
			}
		}
  }

  return (
    <div className='flex flex-col justify-center min-h-screen w-full max-w-[420px] py-10'>
      <Logo height={60} width={60} style='!text-3xl'/>

      <div className='auth-section my-10'>
        <p className='text-4xl font-bold text-customBlack-300'>
          { type === 'sign-in' ? 'Login' : 'Sign Up' }
        </p>
        <p className='text-customBlack-200'>
          {
            type === 'sign-in' ?
            'Welcome back!  Enter your details to continue.':
            'Enter your details to continue.'
          }
        </p>
      </div>

      <div className='auth-section mb-6'>
				<Form { ...form }>
					<form onSubmit={ form.handleSubmit(onSubmit) }>
						<div className='flex flex-col gap-7 mb-10'>
							{
								type === 'sign-up' &&
								<>
									<CustomInput 
										control={form.control} name='username'
										label='Username' placeholder='Enter your username'
									/>

									<CustomInput 
										control={form.control} name='city'
										label='City' placeholder='Enter your city'
									/>
								</>
							}
							<CustomInput 
								control={form.control} name='email'
								label='Email' placeholder='Enter your email'
							/>

							<CustomInput 
								control={form.control} name='password'
								label='Password' placeholder='Enter your password'
							/>
						</div>

						<Button 
							disabled={loading}
							type='submit' 
							className='w-full h-10 green-gradient text-customWhite-200'
						>
							{ type === 'sign-in' ? 'Login' : 'Sign Up' }
						</Button>
					</form>
				</Form>
      </div>

			<div className='flex w-full gap-1 justify-center'>
				<p className='text-sm text-customBlack-200'>
					{
						type === 'sign-in' ?
						"Don't have an account?" :
						"Already have an account?"
					}
				</p>
				<Link
					className='font-bold green-gradient bg-clip-text text-transparent !text-sm !font-semiBold'
					href={ type === 'sign-in' ? '/sign-up' : 'sign-in' }
				>
					{ type === 'sign-in' ? 'Sign Up' : 'Login' }
				</Link>
			</div>
    </div>
  )
}
