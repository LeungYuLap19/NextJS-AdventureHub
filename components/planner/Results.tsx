'use client'
import React, { useEffect, useState } from 'react';
import ResultsItem from '../discover/ResultsItem';
import Subtitle from '../discover/Subtitle';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getFromCookies } from '@/lib/actions/cookies.action';

export default function Results() {
  const [planners, setPlanners] = useState<PlannersItem[]>([]);
  const [filtered, setFiltered] = useState<PlannersItem[]>([]);
  const [noInput, setNoInput] = useState<boolean>(true);

  const getUserData = async () => {
    const userData = await getFromCookies<UserData>('userData');
    if (userData?.uid) {
      const q = query(collection(db, 'planners'), where('uid', '==', userData.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const plannersList: PlannersItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          plannersList.push({
            pid: data.pid,
            name: data.name,
            country: data.country,
            date: {
              from: data.from.toDate(),
              to: data.to.toDate(),
            },
            photo: data.photo,
          });
        });
        setPlanners(plannersList.sort((a, b) => b.date.from.getTime() - a.date.from.getTime()));
      });

      return () => unsubscribe();
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const handlePlannersSearch = (event: CustomEvent<string>) => {
      const searchData = event.detail;
      if (searchData.length > 0) {
        setNoInput(false);
        const filteredPlanners = planners.filter(
          (planner: PlannersItem) =>
            planner.name.toLowerCase().includes(searchData.toLowerCase()) ||
            planner.country.toLowerCase().includes(searchData.toLowerCase())
        );
        setFiltered(filteredPlanners);
      } else {
        setNoInput(true);
        setFiltered([]);
      }
    };

    window.addEventListener('plannersSearch', handlePlannersSearch as EventListener);
    return () => {
      window.removeEventListener('plannersSearch', handlePlannersSearch as EventListener);
    };
  }, [planners]);

  return (
    <div className='flex flex-col w-full gap-7'>
      <Subtitle title={planners.length <= 0 ? 'No Trips' : 'Your Trips'} />
      <div className='w-full grid grid-cols-4 gap-7 max-lg:grid-cols-3 max-md:grid-cols-2 max-lg:gap-4 3xl:grid-cols-6'>
        {filtered.length > 0 ?
          filtered.map((planner: PlannersItem) => (
            <ResultsItem key={planner.pid} plannersItem={planner} />
          )) :
          planners.length > 0 && noInput ?
            planners.map((planner: PlannersItem) => (
              <ResultsItem key={planner.pid} plannersItem={planner} />
            )) :
            <></>
        }
      </div>
    </div>
  );
}