import axios from "axios";

const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=`;

export async function getLocalWeather({ latitude, longitude }: LatLong): Promise<{} | null> {
  try {
    const data = await axios.get(`${baseUrl}${latitude},${longitude}&aqi=no`);
    return data || null;
  } catch (error) {
    console.error('Get Local Weather Error: ', error);
    return null;
  }
}