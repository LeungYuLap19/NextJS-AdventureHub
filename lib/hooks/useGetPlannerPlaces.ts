import { PlannersItem } from "@/types/components";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { convertTimestampToDate } from '@/lib/utils';

export function useGetPlannerPlaces(planner: PlannersItem) {
  const [plannerPlaces, setPlannerPlaces] = useState<PlannerPlaces | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'plannersPlaces'), where('pid', '==', planner.pid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        const transformedPlaces = docData.places.map((place: any) => ({
          ...place,
          assignedDateTimes: place.assignedDateTimes
            ? {
                from: place.assignedDateTimes.from ? convertTimestampToDate(place.assignedDateTimes.from) : null,
                to: place.assignedDateTimes.to ? convertTimestampToDate(place.assignedDateTimes.to) : null,
              }
            : null,
        }));
        setPlannerPlaces({
          pid: docData.pid,
          places: transformedPlaces,
        });
      } else {
        setPlannerPlaces(null);
      }
    });

    return () => unsubscribe();
  }, [planner]);

  function getFsqIds(plannerPlaces: PlannerPlaces): string[] {
    if (!plannerPlaces) return [];
    return plannerPlaces.places.map((plannerPlace: PlannerPlace) => plannerPlace.place.fsq_id);
  }

  return { plannerPlaces, getFsqIds };
}
