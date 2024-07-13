'use server'
import axios from 'axios'

const baseUrl = 'https://api.foursquare.com/v3/';
const headers = {
  accept: 'application/json',
  Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
}

export async function autoComplete({ name, types = 'geo', limit }: AutoCompleteParams): Promise<AutoCompleteResponse[]> {
  try {
    const response = await axios.get(`${baseUrl}autocomplete?query=${name.trim()}&types=${types}&limit=${limit}`, {
      headers
    });
    // console.log(response.data.results);
    return response.data.results || [];
  } catch (error) {
    console.error('Auto Complete Error:', error);
    return [];
  }
}


export async function placeSearch({ latitude, longitude, radius, categories, fields, sort, limit }: PlaceSearchParams): Promise<ResultsItem[]> {
  try {
    const response = await axios.get(`${baseUrl}places/search?ll=${latitude},${longitude}&radius=${radius}&categories=${categories.join(',')}&fields=${fields.join(',')}&sort=${sort}&limit=${limit}`, {
      headers
    });
    // console.log(response.data.results);
    return getPhotosForResults(response.data.results);
  } catch (error) {
    console.error('Place Search Error:', error);
    return [];
  }
}

export async function placePhotos({ fsq_id, limit }: PlacePhotosParams): 
Promise<PlacePhoto[]> {
  try {
    const response = await axios.get(`${baseUrl}places/${fsq_id}/photos?limit=${limit}`, {
      headers
    });
    // console.log(response);
    return response.data || [];
  } catch (error) {
    console.error('Place Photos Error:', error);
    return [];
  }
}

export async function nearbySearch({ fields, limit }: NearbySearchParams): Promise<ResultsItem[]> {
  try {
    const response = await axios.get(`${baseUrl}places/nearby?fields=${fields.join(',')}&limit=${limit}&hacc=`, {
      headers
    });
    // console.log(response.data.results);
    return getPhotosForResults(response.data.results);
  } catch (error) {
    console.error('Nearby Search Error:', error);
    return [];
  }
}

export async function placeDetails({ fsq_id, fields }: PlaceDetailsParams): Promise<PlaceDetails | null> {
  try {
    const response = await axios.get(`${baseUrl}places/${fsq_id}?fields=${fields.join(',')}`, {
      headers
    });
    // console.log(response.data);
    return response.data || null;
  } catch (error) {
    console.error('Place Details Error:', error);
    return null;
  }
}

async function getPhotosForResults(results: ResultsItem[]): Promise<ResultsItem[]>{
  if (results) {
    const resultsWithPhotos = await Promise.all(
      results.map(async (result: ResultsItem) => {
        const photos = await placePhotos({ fsq_id: result.fsq_id, limit: 1 });
        if (photos.length > 0) {
          const photoUrl = photos[0].prefix + 'original' + photos[0].suffix;
          return { ...result, photo: photoUrl };
        }
        else {
          return result;
        }
      })
    );
    // console.log(resultsWithPhotos);
    return resultsWithPhotos;
  }
  return [];
}