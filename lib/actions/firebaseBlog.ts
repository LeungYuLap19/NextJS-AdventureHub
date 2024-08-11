'use server'
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getFromCookies } from './cookies.action';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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
