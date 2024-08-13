'use server'
import { addDoc, collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getFromCookies } from './cookies.action';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getUserByUID } from './firebaseAuth';

export async function createBlog({ bid, publishTime, cover, article, title }: CreateBlogParams): Promise<boolean> {
  try {
    const userData = await getFromCookies<UserData>('userData');
    await addDoc(collection(db, 'blogs'), {
      uid: userData?.uid,
      bid: bid,
      publishTime: publishTime,
      cover: cover,
      article: article,
      title: title
    });
    return true;
  } catch (error: any) {
    console.error('Create Blog Error:', error.code, error.message);
    return false;
  }
}

export async function uploadImage({ image, fileName, bid }: UploadImageParams): Promise<string | null> {
  const storageRef = ref(storage, `${fileName}/${bid}`);
  try {
    // Convert base64 string back to Blob
    const response = await fetch(image);
    const blob = await response.blob();

    // Upload the Blob to Firebase Storage
    const snapshot = await uploadBytes(storageRef, blob);
    const imgUrl = await getDownloadURL(snapshot.ref);
    return imgUrl;
  } catch (error: any) {
    console.error('Upload Image Error:', error.code, error.message);
    return null;
  }
}

export async function getBlogByBid(bid: string): Promise<Blog | null> {
  try {
    const q = query(collection(db, 'blogs'), where('bid', '==', bid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      const userData = await getUserByUID(data.uid);
      const publishTime = new Date(data.publishTime.seconds * 1000 + data.publishTime.nanoseconds / 1000000);
      if (userData) {
        return {
          bid: bid,
          title: data.title,
          article: data.article,
          cover: data.cover,
          publishTime: publishTime,
          userData: userData,
        };
      }
    }
    return null;
  } catch (error: any) {
    console.error('Get Blog By Bid Error:', error.code, error.message);
    return null;
  }
}
