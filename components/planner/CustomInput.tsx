import React from 'react'
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Control, FieldPath, useController } from 'react-hook-form'
import { z } from 'zod';
import { Input } from "@/components/ui/input"
import { tripFormSchema } from '@/lib/utils';
import { DatePicker } from './DatePicker';
import { DateRange } from "react-day-picker";

const formSchema = tripFormSchema;
interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

export default function CustomInput({ control, name, label, placeholder }: CustomInputProps) {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const handleDateChange = (date: DateRange | undefined) => {
    field.onChange(date);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <div className='flex flex-col gap-2'>
          <FormLabel className='text-sm text-customBlack-200'>
            {label}
          </FormLabel>

          <div>
            <FormControl>
              {
                name === 'date' ?
                <DatePicker 
                  value={field.value as DateRange | undefined} 
                  onChange={handleDateChange} 
                  className='w-full'
                /> :
                <Input 
                  id={label}
                  placeholder={placeholder}
                  type={'text'}
                  className='bg-customWhite-100 border border-customBlack-100 placeholder:text-customBlack-100'
                  value={typeof field.value === 'string' || typeof field.value === 'number' ? field.value : ''}
                  onChange={field.onChange}
                />
              }
            </FormControl>
            <FormMessage className='text-red-600 mt-2'>
              {fieldState.error?.message}
            </FormMessage>
          </div>
        </div>
      )}
    />
  )
}