import { useEffect, useState } from "react";
import { getFromCookies } from "../actions/cookies.action";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getBlogByBid, searchBlogs } from "../actions/firebaseBlog";

export function useGetBlogs() {
  const [myBlogs, setMyBlogs] = useState<Blog[]>([]);
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
  const [blogsResults, setBlogsResults] = useState<Blog[]>([]);

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

  const getPopularBlogs = async () => {
    const userData = await getFromCookies<UserData>('userData');
    if (userData?.uid) {
      const q = query(collection(db, 'blogsInteractions'), where('uid', '!=', userData.uid), orderBy('score', 'desc'), limit(18));
      const unsubscribe = onSnapshot(q, async (QuerySnapshot) => {
          const blogsList: Blog[] = [];
          for (const doc of QuerySnapshot.docs) {
              const data = doc.data();
              const blog = await getBlogByBid(data.bid);
              if (blog) {
                blogsList.push(blog);
              }
          }
          // console.log(blogsList);
          setPopularBlogs(blogsList);
      });
      return () => unsubscribe();
    }
  };

  useEffect(() => {
    getMyBlogs();
    getPopularBlogs();
  }, []);

  useEffect(() => {
    const handleBlogsSearch = async (event: CustomEvent<string>) => {
      const searchData = event.detail;
      if (searchData.length > 2) {
        // console.log(searchData);
        const blogs = await searchBlogs(searchData);
        // console.log(blogs);
        setBlogsResults(blogs);
      } else {
        setBlogsResults([]);
      }
    };

    window.addEventListener('blogsSearch', handleBlogsSearch as unknown as EventListener);
    return () => {
      window.removeEventListener('blogsSearch', handleBlogsSearch as unknown as EventListener);
    }
  }, []);

  return { myBlogs, popularBlogs, blogsResults };
}