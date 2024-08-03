import React, { useState } from 'react'
import { Form } from '../ui/form'
import { profileFormSchema } from '@/lib/utils';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import CustomInput from './CustomInput';
import { DialogTitle } from '../ui/dialog';
import { updateUserData } from '@/lib/actions/firebaseAuth';
import { storeToCookies } from '@/lib/actions/cookies.action';
import { toast } from '../ui/use-toast';

export default function ProfileForm({ userData }: { userData: UserData }) {
  const [loading, setLoading] = useState<boolean>(false);

  const formSchema = profileFormSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userData.username,
      email: userData.email,
    }
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (userData) {
      const newUserDataOrError = await updateUserData({
        uid: userData.uid, 
        city: userData.city, 
        username: values.username, 
        oemail: userData.email,
        nemail: values.email, 
        opassword: values.opassword, 
        npassword: values.npassword
      });

      if ('uid' in newUserDataOrError) {
        await storeToCookies<UserData>('userData', newUserDataOrError as UserData);
        toast({
          description: 'User Profile Updated.',
        });
      } else {
        const error = newUserDataOrError as AuthError;
        toast({
          title: 'Error Editing Profile',
          description: `${error.message}`,
        });
      }
    }
    setLoading(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-7'>
        <CustomInput 
          control={form.control} name='username'
          label='Username' placeholder='Enter your new username'
        />
        <CustomInput 
          control={form.control} name='email'
          label='Email' placeholder='Enter your new email'
        />
        <CustomInput 
          control={form.control} name='npassword'
          label='Reset Password' placeholder='Enter your new password'
        />
        <DialogTitle>Comfirm with Password</DialogTitle>
        <CustomInput 
          control={form.control} name='opassword'
          label='Current Password' placeholder='Enter your current password'
        />
        <Button
          disabled={loading}
          type='submit' 
          className='w-full h-10 green-gradient text-customWhite-200'
        >
          Save
        </Button>
      </form>
    </Form>
  )
}
