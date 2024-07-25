import { PlannersItem } from "@/types/components";
import { useGetPlannerPlaces } from "./useGetPlannerPlaces";
import { useEffect, useState } from "react";
import { placeDetails } from "../actions/fourSquareAPI";

export function useGetPlannerMap(planner: PlannersItem ) {
  const { plannerPlaces, getFsqIds } = useGetPlannerPlaces(planner);
  const [geoData, setGeoData] = useState<PlaceDetails[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [selected, setSelected] = useState<{ lat: number, lng: number } | null>(null);
  const [selectedFsqId, setSelectedFsqId] = useState<string | null>(null);

  useEffect(() => {
    const fetchGeoData = async () => {
      if (plannerPlaces) {
        const fsqIds = getFsqIds(plannerPlaces);
        const fields = ['fsq_id', 'geocodes'];
        const geoDataPromises = fsqIds.map(fsq_id => placeDetails({ fsq_id, fields }));
        const geoDataResults = await Promise.all(geoDataPromises);
        setGeoData(geoDataResults.filter(data => data !== null));
      }
    };

    fetchGeoData();
  }, [plannerPlaces]);

  useEffect(() => {
    if (geoData.length > 0) {
      const positions = geoData.map(data => ({
        lat: data.geocodes.main.latitude,
        lng: data.geocodes.main.longitude
      }));
      setPositions(positions);
    }
  }, [geoData]);

  useEffect(() => {
    if (selected) {
      const place = geoData.find(data => 
        data.geocodes.main.latitude === selected.lat &&
        data.geocodes.main.longitude === selected.lng
      );
      place && console.log(place.fsq_id);
      place && setSelectedFsqId(place.fsq_id);
    }
  }, [selected, geoData]);

  return { geoData, positions, setSelected, selectedFsqId }
}