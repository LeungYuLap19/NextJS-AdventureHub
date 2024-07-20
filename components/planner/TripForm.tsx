import React, { useState } from 'react'
import { capitalizeWords, formatDateRange, tripFormSchema } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '../ui/form';
import CustomInput from './CustomInput';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { createPlanner } from '@/lib/actions/firebasePlanner';
import { toast } from '../ui/use-toast';

export default function TripForm({ setOpen }: { setOpen: (open: boolean) => void }) {
  const [loading, setLoading] = useState<boolean>(false);

  const formSchema = tripFormSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const data = await createPlanner({
      pid: crypto.randomUUID(),
      name: values.name,
      country: values.country,
      date: values.date,
      createAt: new Date(),
    });
    if (data) {
      setLoading(false);
      setOpen(false);
      toast({
        title: `Trip Created ∙ ${values.name} ∙ to ${capitalizeWords(values.country.text.primary)}`,
        description: formatDateRange(data),
      });
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
          className='w-full h-10 green-gradient text-customWhite-200'
        >
          Create
        </Button>
      </form>
    </Form>
  )
}
