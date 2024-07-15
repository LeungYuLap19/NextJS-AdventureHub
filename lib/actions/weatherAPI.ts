import axios from "axios";

const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=`;

export async function getLocalWeather({ latitude, longitude }: LatLong): Promise<Weather | null> {
  try {
    const response = await axios.get(`${baseUrl}${latitude},${longitude}&aqi=no`);
    // console.log(response.data);
    return response.data || null;
  } catch (error) {
    console.error('Get Local Weather Error: ', error);
    return null;
  }
}