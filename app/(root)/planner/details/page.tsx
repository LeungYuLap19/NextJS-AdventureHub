'use client'
import PlannerCalendar from '@/components/planner-details/PlannerCalendar';
import PlannerEdit from '@/components/planner-details/PlannerEdit';
import PlannerMap from '@/components/planner-details/PlannerMap';
import PlannerPlaces from '@/components/planner-details/PlannerPlaces';
import PlannerTab from '@/components/planner-details/PlannerTab';
import PlannerWeather from '@/components/planner-details/PlannerWeather';
import { Toaster } from '@/components/ui/toaster';
import { plannerTabs } from '@/constants';
import { db } from '@/lib/firebase';
import { PlannersItem, PlannerTabsParams } from '@/types/components';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'

function PlannerDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [planner, setPlanner] = useState<PlannersItem>();
  const [selected, setSelected] = useState<PlannerTabsParams>(plannerTabs[1]);
  const [selectedFsqId, setSelectedFsqId] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log(selectedFsqId);
  }, [selectedFsqId]);
  
  useEffect(() => {
    const q = query(collection(db, 'planners'), where('pid', '==', id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setPlanner({
          pid: data.pid,
          name: data.name,
          country: data.country,
          date: {
            from: data.from.toDate(),
            to: data.to.toDate(),
          },
          photo: data.photo,
          createAt: data.createAt.toDate()
        });
      })
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      const isMd = window.matchMedia('(min-width: 768px)').matches;
      if (isMd && selected.label === 'places') {
        setSelected(plannerTabs[1]);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [selected]);

  return (
    <div className='w-full max-lg:pb-28 flex gap-4 max-md:flex-col-reverse max-md:pt-[30px]'>
      <div className='flex-[0_0_40%] max-lg:flex-1 max-md:hidden h-planner-details-custom overflow-auto md:mt-[10px]'>
        {
          planner &&
          <PlannerPlaces planner={planner} selectedFsqId={selectedFsqId} />
        }
      </div>

      <div className='flex-1 h-planner-details-custom overflow-auto bg-customWhite-200 max-md:bg-transparent rounded-md max-md:w-full max-md:flex-grow-0 md:mt-[10px] min-w-0'>
        {
          selected.label === 'places' && planner &&
          <div className='md:hidden w-full h-full'>
            <PlannerPlaces planner={planner} selectedFsqId={selectedFsqId} />
          </div>
        }
        {
          selected.label === 'calendar' &&
          <PlannerCalendar />
        }
        {
          selected.label === 'map' && planner &&
          <PlannerMap planner={planner} setSelectedFsqId={setSelectedFsqId} />
        }
        {
          selected.label === 'weather' && planner &&
          <PlannerWeather country={planner?.country} />
        }
        {
          selected.label === 'edit' && planner &&
          <PlannerEdit planner={planner} />
        }
      </div>

      <div className='w-[50px] h-24 max-md:w-full max-md:h-[50px] max-md:flex max-md:justify-between'>
        <div className='md:hidden bg-customWhite-200 rounded-md'>
          <PlannerTab tab={plannerTabs[0]} selected={selected} setSelected={setSelected} />
        </div>

        <div className='max-md:flex bg-customWhite-200 rounded-md gap-1 md:mt-[10px]'>
          {
            plannerTabs.map((tab, index) => {
              if (index !== 0) {
                return <PlannerTab key={tab.label} tab={tab} selected={selected} setSelected={setSelected} />
              }
            })
          }
        </div>
      </div>
    </div>
  )
}

const WrappedPlannerDetailsPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PlannerDetailsPage />
    <Toaster />
  </Suspense>
);

export default WrappedPlannerDetailsPage;