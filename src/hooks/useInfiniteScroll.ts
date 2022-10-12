import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { API_ENDPOINT } from '../constants';
import { PostData } from '../types';
import { fetcher } from '../utils';

const PAGE_SIZE = 10;

export const useInfiniteScroll = () => {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  const getKey = (
    pageIndex: number,
    previousPageData: { posts: PostData[] },
  ) => {
    if (previousPageData && !previousPageData.posts.length) return null;
    return `${API_ENDPOINT}/post/feed/?limit=${PAGE_SIZE}&skip=${
      pageIndex * PAGE_SIZE
    }`;
  };

  const { data, error, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    { revalidateAll: true },
  );

  const isEmpty = data?.[0]?.posts.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.posts.length < PAGE_SIZE);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting && !isReachingEnd) {
      setSize((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.6,
    });
    observer.observe(target);
    // eslint-disable-next-line consistent-return
    return () => observer && observer.disconnect();
  }, [target]);

  return { data, error, isValidating, setTarget, isReachingEnd };
};
