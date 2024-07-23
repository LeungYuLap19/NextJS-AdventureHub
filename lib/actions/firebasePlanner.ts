'use server'
import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { getFromCookies } from './cookies.action';
import { PlannersItem } from '@/types/components';

export async function createPlanner({ pid, name, country, date, createAt }: PlannersItem) {
  try {
    const userData = await getFromCookies<UserData>('userData');
    await addDoc(collection(db, 'planners'), {
      uid: userData?.uid,
      pid: pid,
      name: name,
      country: country,
      from: date.from,
      to: date.to,
      createAt: createAt,
    });
    return { pid: pid, name: name, country: country, date: date, createAt: createAt };
  } catch (error: any) {
    console.error('Create Planner Error:', error.code, error.message);
    return null;
  }
}

export async function editPlanner({ pid, name, country, date, createAt }: PlannersItem) {
  try {
    const q = query(collection(db, 'planners'), where('pid', '==', pid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log('query exist')
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        name: name,
        country: country,
        from: date.from,
        to: date.to,
        createAt: createAt,
      });
      return { pid: pid, name: name, country: country, date: date, createAt: createAt };
    }
    return null;
  } catch (error: any) {
    console.error('Edit Planner Error:', error.code, error.message);
    return null;
  }
}

export async function addToPlanner(resultsItem: ResultsItem, pid: string) {
  try {
    const q = query(collection(db, 'plannersPlaces'), where('pid', '==', pid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const existingPlaces = querySnapshot.docs[0].data().places;

      // Check if the resultsItem is already in the places array
      const isAlreadyIn = existingPlaces.some((place: any) => place.place.fsq_id === resultsItem.fsq_id);

      if (!isAlreadyIn) {
        await updateDoc(docRef, {
          places: [
            ...existingPlaces,
            { place: resultsItem, assignedDate: null }
          ]
        });
      } else {
        return { message: `${resultsItem.name} already in the planner.` }
      }
    } else {
      await addDoc(collection(db, 'plannersPlaces'), {
        pid: pid,
        places: [{ place: resultsItem, assignedDate: null }]
      });
    }
    return { pid: pid, places: [{ place: resultsItem, assignedDate: null }] };
  } catch (error: any) {
    console.error('Add To Planner Error:', error.code, error.message);
    return null;
  }
}

// export async function getFromPlanner(pid: string): Promise<PlannerPlaces | null> {
//   try {
//     const q = query(collection(db, 'plannersPlaces'), where('pid', '==', pid));
//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       const docData = querySnapshot.docs[0].data();
//       return {
//         pid: docData.pid,
//         places: docData.places,
//       };
//     }
//     return null;
//   } catch (error: any) {
//     console.error('Get From Planner Error:', error.code, error.message);
//     return null;
//   }
// }