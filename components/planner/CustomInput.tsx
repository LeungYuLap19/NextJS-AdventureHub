import React, { useRef, useState } from 'react';
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, useController } from 'react-hook-form';
import { z } from 'zod';
import { Input } from "@/components/ui/input";
import { tripFormSchema } from '@/lib/utils';
import { DatePicker } from './DatePicker';
import { DateRange } from "react-day-picker";
import { autoComplete } from '@/lib/actions/fourSquareAPI';

const formSchema = tripFormSchema;

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

export default function CustomInput({ control, name, label, placeholder }: CustomInputProps) {
  const [searchResults, setSearchResults] = useState<AutoCompleteResponse[] | null>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);

  const { field, fieldState } = useController({
    control,
    name,
  });

  const handleDateChange = (date: DateRange | undefined) => {
    field.onChange(date);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);

    if (name === 'country' && e.target.value.length >= 3) {
      const data: AutoCompleteResponse[] = await autoComplete({ name: e.target.value, limit: 5 });
      setSearchResults(data);
    } else {
      setSearchResults(null);
    }
  };

  const handleOnClick = (selected: AutoCompleteResponse) => {
    if (name === 'country' && countryRef.current) {
      field.onChange(selected);
      countryRef.current.value = selected.text.primary;
      setSearchResults(null);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <div className='flex flex-col gap-2 relative'>
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
                    autoComplete='off'
                    ref={countryRef}
                    id={label}
                    placeholder={placeholder}
                    type={'text'}
                    className='bg-customWhite-100 border border-customBlack-100 placeholder:text-customBlack-100'
                    value={
                      typeof field.value === 'string' || typeof field.value === 'number'
                        ? field.value
                        : field.value && 'text' in field.value
                          ? field.value.text.primary
                          : ''
                    }
                    onChange={handleInputChange}
                  />
              }
            </FormControl>
            <FormMessage className='text-red-600 mt-2'>
              {fieldState.error?.message}
            </FormMessage>
          </div>

          {
            searchResults &&
            <div className='flex flex-col absolute top-[73px] left-0 w-full bg-customWhite-200 z-50 rounded-lg overflow-hidden drop-shadow-default'>
              {
                searchResults.map((result: AutoCompleteResponse, index: number) => (
                  <p
                    key={index}
                    onClick={() => handleOnClick(result)}
                    className='w-full px-3 py-2 text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:bg-customWhite-100'>
                    {result.text.primary}
                  </p>
                ))
              }
            </div>
          }
        </div>
      )}
    />
  );
}
