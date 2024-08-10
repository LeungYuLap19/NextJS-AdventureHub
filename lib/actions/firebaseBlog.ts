'use server'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { getFromCookies } from './cookies.action';

export async function createBlog({ bid, publishTime, cover, article, title }: CreateBlogParams): Promise<boolean> {
  try {
    const userData = await getFromCookies<UserData>('userData');
    await addDoc(collection(db, 'blogs'), {
      uid: userData?.uid,
      bid: bid,
      publishTime: publishTime,
      // cover need to be url from firebase storage
      article: article,
      title: title
    });
    return true;
  } catch (error: any) {
    console.error('Create Blog Error:', error.code, error.message);
    return false;
  }
}