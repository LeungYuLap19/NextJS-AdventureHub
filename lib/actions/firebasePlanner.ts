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
    console.log('updating', pid)
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