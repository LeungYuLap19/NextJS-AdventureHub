'use server'
import axios from "axios";

const headers = (fieldMask: string) => {
  return {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    'X-Goog-FieldMask': fieldMask,
  }
}

export async function textSearch({ name, latitude, longitude, formatted_address }: TextSearchParams): Promise<ExtraData | null> {
  try {
    const response = await axios.post('https://places.googleapis.com/v1/places:searchText', {
      textQuery: `${name}, ${formatted_address}`,
      pageSize: 1,
      locationBias: {
        circle: {
          center: {latitude: latitude, longitude: longitude},
          radius: 500.0
        }
      },
    }, {
      headers: headers('places.id,places.reviews,places.googleMapsUri'),
    });
    // console.log(response.data.places[0]);
    return response.data.places[0] || null;
  } catch (error) {
    console.error('Text Search Error:', error);
    return null;
  }
}