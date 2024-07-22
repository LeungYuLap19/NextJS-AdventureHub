import React from 'react'
import Header from '../discover/Header'
import TripForm from '../planner/TripForm'
import { PlannersItem } from '@/types/components'

export default function PlannerEdit({ planner }: { planner: PlannersItem }) {
  return (
    <div className='flex flex-col md:p-7 md:pb-10 gap-7'>
      <Header title={<>Edit Your Trip</>} />

      <TripForm type='edit' defaultValues={planner} pid={planner.pid} />

      
    </div>
  )
}
