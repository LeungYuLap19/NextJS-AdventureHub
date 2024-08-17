import { useEffect, useState } from "react";
import { getFromCookies } from "../actions/cookies.action";
import { collection, getDoc, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getBlogByBid, searchBlogs } from "../actions/firebaseBlog";
import { useGetPlanners } from "./useGetPlanners";
import { getUserByUID } from "../actions/firebaseAuth";

export function useGetBlogs() {
  const [myBlogs, setMyBlogs] = useState<Blog[]>([]);
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
  const [recommendedBlogs, setRecommendedBlogs] = useState<Blog[]>([]);
  const [blogsResults, setBlogsResults] = useState<Blog[]>([]);
  const { planners } = useGetPlanners();

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
            tags: data.tags,
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
      // Fetch recommended blog IDs
      const recommendedBlogIds = new Set(recommendedBlogs.map(blog => blog.bid));
      console.log(recommendedBlogIds);
      
      // Fetch more blogs than needed to handle exclusions
      const q = query(
        collection(db, 'blogsInteractions'),
        where('uid', '!=', userData.uid),
        orderBy('score', 'desc'),
        limit(18) // Fetch more than needed to handle exclusions
      );
  
      const unsubscribe = onSnapshot(q, async (QuerySnapshot) => {
        const blogsList: Blog[] = [];
        const fetchedBlogIds = new Set<string>();
  
        for (const doc of QuerySnapshot.docs) {
          const data = doc.data();
          const blog = await getBlogByBid(data.bid);
          if (blog && !recommendedBlogIds.has(blog.bid) && !fetchedBlogIds.has(blog.bid)) {
            blogsList.push(blog);
            fetchedBlogIds.add(blog.bid);
          }
          if (blogsList.length >= 12) {
            break;
          }
        }
        setPopularBlogs(blogsList);
      });
  
      return () => unsubscribe();
    }
  };
  

  const getRecommendedBlogs = async () => {
    const userData = await getFromCookies<UserData>('userData');
    if (userData?.uid) {
      const places = planners.map((planner) => planner.country.text.primary);
      console.log(places);
      if (places.length > 0) {
        const q = query(
          collection(db, 'blogs'),
          where('uid', '!=', userData.uid),
          where('tags', 'array-contains-any', places),
          limit(6)
        );
        const unsubscribe = onSnapshot(q, async (QuerySnapshot) => {
          const blogsList: Blog[] = [];
          const cacheUserDataList: Record<string, UserData> = {};
  
          for (const doc of QuerySnapshot.docs) {
            const data = doc.data();
            let cacheUserData: UserData | null = cacheUserDataList[data.uid];
  
            if (!cacheUserData) {
              cacheUserData = await getUserByUID(data.uid);
              if (cacheUserData) {
                cacheUserDataList[data.uid] = cacheUserData;
              }
            }
  
            if (cacheUserData) {
              blogsList.push({
                bid: data.bid,
                title: data.title,
                article: data.article,
                cover: data.cover,
                publishTime: data.publishTime,
                userData: cacheUserData,
                tags: data.tags,
              });
            }
          }
  
          setRecommendedBlogs(blogsList);
        });
  
        return () => unsubscribe();
      } else {
        setRecommendedBlogs([]);
      }
    }
  };

  useEffect(() => {
    getMyBlogs();
  }, []);

  useEffect(() => {
    getRecommendedBlogs();
  }, [planners]);

  useEffect(() => {
    getPopularBlogs(); 
  }, [recommendedBlogs]);

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

  return { myBlogs, recommendedBlogs, popularBlogs, blogsResults };
}