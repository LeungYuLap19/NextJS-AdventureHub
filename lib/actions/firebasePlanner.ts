'use server'
import { addDoc, collection, deleteDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
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
            { place: resultsItem, assignedDateTimes: { from: null, to: null } }
          ]
        });
      } else {
        return { message: `${resultsItem.name} already in the planner.` }
      }
    } else {
      await addDoc(collection(db, 'plannersPlaces'), {
        pid: pid,
        places: [{ place: resultsItem, assignedDateTimes: { from: null, to: null } }]
      });
    }
    return { pid: pid, places: [{ place: resultsItem, assignedDateTimes: { from: null, to: null } }] };
  } catch (error: any) {
    console.error('Add To Planner Error:', error.code, error.message);
    return null;
  }
}

export async function removeFromPlanner(fsq_id: string, pid: string) {
  try {
    const q = query(collection(db, 'plannersPlaces'), where('pid', '==', pid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const existingPlaces = querySnapshot.docs[0].data().places;

      const updatedPlaces = existingPlaces.filter((place: any) => place.place.fsq_id !== fsq_id);

      await updateDoc(docRef, {
        places: updatedPlaces
      });

      return true;
    }
    return false;
  } catch (error: any) {
    console.error('Remove From Planner Error:', error.code, error.message);
    return false;
  }
}

export async function deletePlanner(pid: string) {
  try {
    const q1 = query(collection(db, 'planners'), where('pid', '==', pid));
    const q2 = query(collection(db, 'plannersPlaces'), where('pid', '==', pid));
    const querySnapshotPlanners = await getDocs(q1);
    const querySnapshotPlannersPlaces = await getDocs(q2);

    if (!querySnapshotPlanners.empty) {
      const PlannersDocRef = querySnapshotPlanners.docs[0].ref;
      await deleteDoc(PlannersDocRef);
      if (!querySnapshotPlannersPlaces.empty) {
        const PlannersPlacesDocRef = querySnapshotPlannersPlaces.docs[0].ref;
        await deleteDoc(PlannersPlacesDocRef);
      }
      return true;
    }

    return false;
  } catch (error: any) {
    console.error('Delete Planner Error:', error.code, error.message);
    return false;
  }
}

export async function assignDateTime(pid: string, fsq_id: string, from: Date, to: Date) {
  try {
    const q = query(collection(db, 'plannersPlaces'), where('pid', '==', pid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const currentDoc = querySnapshot.docs[0].data();
      const updatedPlaces = currentDoc.places.map((place: PlannerPlace) => {
        if (place.place.fsq_id === fsq_id) {
          console
          return {
            ...place, 
            assignedDateTimes: {
              from,
              to,
            },
          };
        }
        return place;
      });

      await updateDoc(docRef, {
        places: updatedPlaces,
      });

      return true;
    }

    return false;
  } catch (error: any) {
    console.error('Assign Date Time Error:', error.code, error.message);
    return false;
  }
}