import { PlannersItem } from "@/types/components";
import { useEffect, useState } from "react";
import { getFromCookies } from "../actions/cookies.action";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { sortPlanners } from "../utils";

export function useGetPlanners() {
  const [planners, setPlanners] = useState<PlannersItem[]>([]);
  const [filtered, setFiltered] = useState<PlannersItem[]>([]);
  const [noInput, setNoInput] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>('recently');

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
            createAt: data.createAt.toDate()
          });
        });
        const sortedPlanners = sortPlanners(plannersList, selected);
        setPlanners(sortedPlanners);
        setFiltered(sortedPlanners); // Also set the filtered planners initially
      });

      return () => unsubscribe();
    }
  };

  useEffect(() => {
    getUserData();
  }, [selected]);

  useEffect(() => {
    const handlePlannersSearch = (event: CustomEvent<string>) => {
      const searchData = event.detail;
      if (searchData.length > 0) {
        setNoInput(false);
        const filteredPlanners = planners.filter(
          (planner: PlannersItem) =>
            planner.name.toLowerCase().includes(searchData.toLowerCase()) ||
            planner.country.text.primary.toLowerCase().includes(searchData.toLowerCase())
        );
        setFiltered(sortPlanners(filteredPlanners, selected)); 
      } else {
        setNoInput(true);
        setFiltered(sortPlanners(planners, selected)); 
      }
    };

    window.addEventListener('plannersSearch', handlePlannersSearch as EventListener);
    return () => {
      window.removeEventListener('plannersSearch', handlePlannersSearch as EventListener);
    };
  }, [planners, selected]);

  return { planners, filtered, noInput, setSelected }
}