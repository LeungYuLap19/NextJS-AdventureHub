'use server'
import { addDoc, collection, DocumentData, DocumentReference, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getFromCookies } from './cookies.action';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getUserByUID } from './firebaseAuth';

export async function createBlog({ bid, publishTime, cover, article, title, tags }: CreateBlogParams): Promise<boolean> {
  const userData = await getFromCookies<UserData>('userData');
  if (!userData) {
    return false;
  }
  try {
    await addDoc(collection(db, 'blogs'), {
      uid: userData.uid,
      bid: bid,
      publishTime: publishTime,
      cover: cover,
      article: article,
      title: title,
      titleLower: title.toLowerCase(),
      tags: tags,
    });
    const done = await createBlogInteraction(bid, userData.uid);
    if (done) {
      return true;
    }
    return false;
  } catch (error: any) {
    console.error('Create Blog Error:', error.code, error.message);
    return false;
  }
}

async function createBlogInteraction(bid: string, uid: string): Promise<boolean> {
  try {
    await addDoc(collection(db, 'blogsInteractions'), {
      bid: bid,
      uid: uid,
      likes: [],
      comments: [],
      views: [],
      score: 0,
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
          tags: data.tags,
        };
      }
    }
    return null;
  } catch (error: any) {
    console.error('Get Blog By Bid Error:', error.code, error.message);
    return null;
  }
}

export async function likeBlog(bid: string): Promise<boolean> {
  const userData = await getFromCookies<UserData>('userData');
  if (!userData) {
    return false;
  }
  try {
    const q = query(collection(db, 'blogsInteractions'), where('bid', '==', bid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const data = querySnapshot.docs[0].data();
      let likes: string[] = data.likes;
      likes.includes(userData.uid) ? likes = likes.filter((id: string) => id !== userData.uid) : likes.push(userData.uid);
      await updateDoc(docRef, { likes: likes });
      const done = await updateBlogScore(docRef, { ...data, likes });
      if (done) {
        return true;
      }
      return false;
    }
    return false;
  } catch (error: any) {
    console.error('Like Blog Action Error:', error.code, error.message);
    return false;
  }
}

export async function addBlogComment({ bid, publishTime, text }: AddBlogCommentParams): Promise<boolean> {
  const userData = await getFromCookies<UserData>('userData');
  if (!userData) {
    return false;
  }
  try {
    const q = query(collection(db, 'blogsInteractions'), where('bid', '==', bid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const data = querySnapshot.docs[0].data();
      let comments: BlogComment[] = data.comments;
      comments.push({
        displayName: userData.username,
        publishTime,
        text,
      });
      await updateDoc(docRef, { comments: comments });
      const done = await updateBlogScore(docRef, { ...data, comments });
      if (done) {
        return true;
      }
      return false;
    }

    return false;
  } catch (error: any) {
    console.error('Add Blog Comment Error:', error.code, error.message);
    return false;
  }
}

export async function addBlogView(bid: string): Promise<boolean> {
  const userData = await getFromCookies<UserData>('userData');
  if (!userData) {
    return false;
  }
  try {
    const q = query(collection(db, 'blogsInteractions'), where('bid', '==', bid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const data = querySnapshot.docs[0].data();
      let views: string[] = data.views;
      views.push(userData.uid);
      await updateDoc(docRef, { views });
      const done = await updateBlogScore(docRef, { ...data, views });
      if (done) {
        return true;
      }
      return false;
    }

    return false;
  } catch (error: any) {
    console.error('Add Blog View Error:', error.code, error.message);
    return false;
  }
}

export async function searchBlogs(input: string): Promise<Blog[]> {
  try {
    const q = query(collection(db, 'blogs'), where('titleLower', '>=', input.toLowerCase()), where('titleLower', '<=', input.toLowerCase() + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const blogs: Blog[] = [];
      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const userData = await getUserByUID(data.uid);
        const publishTime = new Date(data.publishTime.seconds * 1000 + data.publishTime.nanoseconds / 1000000);
        if (userData) {
          blogs.push({
            bid: data.bid ,
            title: data.title ,
            article: data.article ,
            cover: data.cover ,
            publishTime: publishTime,
            userData: userData,
            tags: data.tags,
          });
        }
      }

      return blogs;
    }
    return [];
  } catch (error: any) {
    console.error('Search Blogs Error:', error.code, error.message);
    return [];
  }
}

const W1 = 1;
const W2 = 2;
const W3 = 0.5;

async function updateBlogScore(docRef: DocumentReference<DocumentData, DocumentData>, data: DocumentData): Promise<boolean> {
  try {
    const likes = data.likes.length; 
    const comments = data.comments.length;
    const views = data.views.length;
    const score = likes * W1 + comments * W2 + views * W3;
    await updateDoc(docRef, { score });

    return true;
  } catch (error: any) {
    console.error('Update Blog Score Error:', error.code, error.message);
    return false;
  }
}