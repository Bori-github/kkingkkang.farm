import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { API_ENDPOINT } from '../../constants';
import { PostData } from '../../types';
import { fetcher } from '../../utils';
import { Loader } from '../common/Loader';
import { FeedCard } from './FeedCard';

const PAGE_SIZE = 10;

export const FeedContainer = () => {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [feedData, setFeedData] = useState<PostData[]>([]);

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

  useEffect(() => {
    if (data) {
      const updateData = data.flatMap((data) => data.posts);
      setFeedData(updateData);
    }
  }, [data]);

  if (!data || !feedData) return <Loader height="100vh" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <SectionFeed>
      {data && feedData ? (
        feedData.map((data: PostData) => {
          const {
            id,
            content,
            image,
            createdAt,
            hearted,
            heartCount,
            commentCount,
            author,
          } = data;

          return (
            <FeedCard
              key={`feed-item-${id}`}
              postData={{
                id,
                content,
                image,
                createdAt,
                hearted,
                heartCount,
                commentCount,
                author,
              }}
            />
          );
        })
      ) : (
        <Loader height="100vh" />
      )}
      <TargetElement ref={setTarget}>
        {isValidating && !isReachingEnd && <Loader height="auto" />}
      </TargetElement>
    </SectionFeed>
  );
};

const SectionFeed = styled.section`
  width: 100%;
`;

const TargetElement = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;
