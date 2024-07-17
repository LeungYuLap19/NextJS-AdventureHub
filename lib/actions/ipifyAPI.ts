'use server'
import axios from "axios";

export async function getLatLong(): Promise<LatLong | null> {
  try {
    const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.NEXT_PUBLIC_IP_GEOLOCATION_API_KEY}`);
    // console.log({ latitude: response.data.location.lat, longitude: response.data.location.lng });
    return { latitude: response.data.location.lat, longitude: response.data.location.lng } || null;
  } catch (error) {
    console.error('Get Lat Long Error: ', error);
    return null;
  }
}