import { useEffect, useState } from "react";
import { getFromCookies } from "../actions/cookies.action";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";

export function useGetBlogs() {
  const [myBlogs, setMyBlogs] = useState<Blog[]>([]);

  const getMyBlogs = async () => {
    const userData = await getFromCookies<UserData>('userData');
    if (userData?.uid) {
      const q = query(collection(db, 'blogs'), where('uid', '==', userData.uid));
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const blogsList: Blog[] = [];
        QuerySnapshot.forEach((doc) => {
          const data = doc.data();
          blogsList.push({
            bid: data.bid,
            title: data.title,
            article: data.article,
            cover: data.cover,
            publishTime: data.publishTime,
            userData: userData, 
          });
        });
        // console.log(blogsList);
        const sortedBlogs = blogsList.sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime());
        setMyBlogs(sortedBlogs);
      });
      return () => unsubscribe();
    }
  };

  useEffect(() => {
    getMyBlogs();
  }, []);

  return { myBlogs };
}