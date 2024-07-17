'use server'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { getFromCookies } from './cookies.action';

export async function createPlanner({ pid, name, country, date }: PlannersItem) {
  try {
    const userData = await getFromCookies<UserData>('userData');
    await addDoc(collection(db, 'planners'), {
      uid: userData?.uid,
      pid: pid,
      name: name,
      country: country,
      from: date.from,
      to: date.to
    });
    return { pid: pid, name: name, country: country, date: date };
  } catch (error: any) {
    console.error('Create Planner Error:', error.code, error.message);
    return null;
  }
}