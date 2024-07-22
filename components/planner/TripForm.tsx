import React, { useState } from 'react'
import { capitalizeWords, cn, formatDateRange, tripFormSchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '../ui/form';
import CustomInput from './CustomInput';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { createPlanner, editPlanner } from '@/lib/actions/firebasePlanner';
import { toast } from '../ui/use-toast';
import { TripFormProps } from '@/types/components';

export default function TripForm({ setOpen, type, defaultValues, pid }: TripFormProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const formSchema = tripFormSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    if (type === 'create') {
      const data = await createPlanner({
        pid: crypto.randomUUID(),
        name: values.name,
        country: values.country,
        date: values.date,
        createAt: new Date(),
      });
      if (data && setOpen) {
        setLoading(false);
        setOpen(false);
        toast({
          title: `Trip Created ∙ ${values.name} ∙ to ${capitalizeWords(values.country.text.primary)}`,
          description: formatDateRange(data),
        });
      }
    }
    else if (type === 'edit') {
      const data = await editPlanner({
        pid: pid,
        name: values.name,
        country: values.country,
        date: values.date,
        createAt: new Date(),
      });
      if (data) {
        setLoading(false);
        toast({
          title: `Saved ∙ ${values.name} ∙ to ${capitalizeWords(values.country.text.primary)}`,
          description: formatDateRange(data),
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-7'>
        <CustomInput 
          control={form.control} name='name'
          label='Name' placeholder='Name your trip'
        />

        <CustomInput 
          control={form.control} name='country'
          label='Country/City' placeholder='Enter a country/city'
        />

        <CustomInput 
          control={form.control} name='date'
          label='Duration of Your Trip' placeholder=''
        />

        <Button
          disabled={loading}
          type='submit'
          className={cn('h-10 green-gradient text-customWhite-200', {
            'w-full': type === 'create',
            'w-fit': type === 'edit'
          })}
        >
          {type === 'create' ? 'Create' : 'Save'}
        </Button>
      </form>
    </Form>
  )
}
