import { cn } from '@/lib/utils'
import React from 'react'

export default function DetailsTable({ label, data, first = false }: DetailsTableProps) {
	return (
		<div className={cn('flex max-2xl:text-sm max-w-full', {
			'font-semibold': first
		})}>
			<p className={`${'w-14 flex-shrink-0 font-semibold'} 
				${label === 'Address' || label === 'Phone' || label === 'Website' || label === 'Email' ? 'w-20' : ''}`}>{label}</p>
			<p className='flex-grow'>
				{
					label === 'Website' ?
					<a 
						target='_blank'
						rel='noopener noreferrer'
						className='text-customGreen-200 underline' 
						href={data.split(', ')[0]}
					>
						Website Link
					</a> :
					data
				}
			</p>
		</div>
	)
}