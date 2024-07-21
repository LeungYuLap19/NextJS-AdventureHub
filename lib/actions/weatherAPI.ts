'use server'
import axios from "axios";

const baseUrl = `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=`;

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

const fullWeatherBaseUrl = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=`;

export async function getFullLocalWeather({ latitude, longitude }: LatLong): Promise<SevenDaysWeather | null> {
  try {
    const response = await axios.get(`${fullWeatherBaseUrl}${latitude},${longitude}&days=7&aqi=no&alerts=no`);
    // console.log(response.data);
    return response.data || null;
  } catch (error) {
    console.error('Get Full Local Weather Error: ', error);
    return null;
  }
}