import React from 'react';
import { Control, FieldPath, useController } from 'react-hook-form';
import { z } from 'zod';
import { FormField, FormLabel, FormMessage } from '../ui/form';
import { FormControl } from '@mui/material';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { blogFormSchema } from '@/lib/utils';

const formSchema = blogFormSchema;

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

export default function CustomInput({
  control,
  name,
  label,
  placeholder,
}: CustomInputProps) {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (name === 'cover' && e.target instanceof HTMLInputElement && e.target.files) {
      field.onChange(e.target.files[0]);
    } else {
      field.onChange(e);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <>
          {name === 'cover' && (
            <FormLabel
              htmlFor={label}
              className={'absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-customWhite-200'}
            >
              {label}
            </FormLabel>
          )}
          <>
            <FormControl className={`${name === 'cover' ? 'absolute top-0 left-0' : 'w-full'}`}>
              {(name === 'cover' || name === 'title') ? (
                <Input
                  id={label}
                  type={name === 'cover' ? 'file' : 'text'}
                  className={`${
                    name === 'cover'
                      ? 'hidden'
                      : 'text-3xl font-semibold text-customBlack-300 max-md:text-xl bg-transparent border-none p-0 focus-visible:ring-transparent'
                  }`}
                  accept={name === 'cover' ? 'image/*' : undefined}
                  placeholder={name === 'title' ? placeholder : undefined}
                  onChange={handleChange}
                />
              ) : (
                <Textarea
                  id={label}
                  className='h-[50vh] text-base rounded-none bg-transparent border-none focus-visible:ring-transparent p-0 text-customBlack-300'
                  placeholder={placeholder}
                  onChange={handleChange}
                />
              )}
            </FormControl>
            <FormMessage className='text-red-600 mt-2'>
              {fieldState.error?.message}
            </FormMessage>
          </>
        </>
      )}
    />
  );
}
