import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { getFromCookies } from "../actions/cookies.action";

export function useGetBlogsDetails(bid: string) {
  const [details, setDetails] = useState<BlogDetails | null>(null);
  const [liked, setLiked] = useState<boolean>(false);

  const getBlogDetails = async () => {
    const userData = await getFromCookies<UserData>('userData');
    const q = query(collection(db, 'blogsInteractions'), where('bid', '==', bid));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const data = QuerySnapshot.docs[0].data();
      const comments = data.comments.map((comment: any) => ({
        ...comment,
        publishTime: new Date(comment.publishTime.seconds * 1000 + comment.publishTime.nanoseconds / 1000000)
      })).sort((a: any, b: any) => b.publishTime - a.publishTime);
    
      const blogDetails: BlogDetails = {
        likes: data.likes,
        comments: comments,
        views: data.views,
      };
      setDetails(blogDetails);
      if (userData) {
        setLiked(blogDetails.likes.includes(userData.uid));
      }
    });
    return () => unsubscribe();
  }

  useEffect(() => {
    getBlogDetails();
  }, []);

  return { details, liked };
}