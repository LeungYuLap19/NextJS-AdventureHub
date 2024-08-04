import { PlannersItem } from "@/types/components";
import { useGetPlannerPlaces } from "./useGetPlannerPlaces";
import { useEffect, useState } from "react";
import { placeDetails } from "../actions/fourSquareAPI";

export function useGetPlannerMap(planner: PlannersItem ) {
  const { plannerPlaces, getFsqIds } = useGetPlannerPlaces(planner);
  const [ places, setPlaces ] = useState<PlannerPlace[] | null>(null);
  useEffect(() => {
    const fetchGeoData = async () => {
      if (plannerPlaces) {
        const fsqIds = getFsqIds(plannerPlaces);
        const fields = ['fsq_id', 'geocodes'];
        const geoDataPromises = fsqIds.map(fsq_id => placeDetails({ fsq_id, fields }));
        const geoDataResults = await Promise.all(geoDataPromises);
        const finalGeo = geoDataResults.filter(data => data !== null);

        const placesWithGeo = plannerPlaces.places.map((plannerPlace: PlannerPlace) => {
          const correspondingResult = finalGeo.find((data: PlaceDetails) => data.fsq_id === plannerPlace.place.fsq_id);
          if (correspondingResult) {
            plannerPlace.geoData = {
              lat: correspondingResult?.geocodes.main.latitude,
              lng: correspondingResult?.geocodes.main.longitude,
            }
          }
          return plannerPlace;
        });

        setPlaces(placesWithGeo);
      }
    }

    fetchGeoData();
  }, [plannerPlaces]);

  return { places }
}