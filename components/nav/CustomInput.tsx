import { profileFormSchema } from '@/lib/utils'
import React from 'react'
import { Control, FieldPath, useFormContext } from 'react-hook-form';
import { z } from 'zod';
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '../ui/input';

const formSchema = profileFormSchema;
interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

export default function CustomInput({ control, name, label, placeholder }: CustomInputProps) {
  return (
    <FormField
      control={ control }
      name={ name }
      render={({ field }) => (
        <div className='flex flex-col gap-2'>
          <FormLabel className='text-sm text-customBlack-200'>
            {label}
          </FormLabel>

          <div>
            <FormControl>
              <Input 
                id={label}
                placeholder={placeholder}
                type={name === 'npassword' || name === 'opassword' ? 'password' : 'text'}
                className='border border-customBlack-100 placeholder:text-customBlack-100'
                {...field}
              />
            </FormControl>
            <FormMessage className='text-red-600 mt-2' />
          </div>
        </div>
      )}
    />
  )
}
