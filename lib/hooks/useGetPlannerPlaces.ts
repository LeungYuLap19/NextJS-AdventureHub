import { PlannersItem } from "@/types/components";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export function useGetPlannerPlaces(planner: PlannersItem) {
  const [plannerPlaces, setPlannerPlaces] = useState<PlannerPlaces | null>(null);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'plannersPlaces'), where('pid', '==', planner.pid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty){
        const docData = querySnapshot.docs[0].data();
        setPlannerPlaces({
          pid: docData.pid,
          places: docData.places,
        });
        setRenderKey(renderKey + 1);
      }
      else {
        setPlannerPlaces(null);
        setRenderKey(renderKey + 1);
      }
    });

    return () => unsubscribe();
  }, [planner]);

  return { renderKey, plannerPlaces };
}