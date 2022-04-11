import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { API_ENDPOINT } from '../../constants';
import { Post } from '../../types/Post';
import { fetcher } from '../../utils';
import { Loader } from '../common/Loader';
import { FeedCard } from './FeedCard';

const PAGE_SIZE = 10;

export const FeedContainer = () => {
  const [postList, setPostList] = useState<Array<Post>>([]);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: feedData,
    error,
    size,
    setSize,
  } = useSWRInfinite(
    (index) => `${API_ENDPOINT}/post/feed/?limit=10&skip=${index * PAGE_SIZE}`,
    fetcher,
  );

  useEffect(() => {
    if (feedData) {
      feedData.map((data) => {
        return setPostList([...postList, ...data.posts]);
      });
    }
    setIsLoading(true);
  }, [feedData]);

  const isEmpty = feedData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (feedData && feedData[feedData.length - 1]?.posts.length < PAGE_SIZE);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting && !isReachingEnd) {
      setIsLoading(false);
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

  if (!feedData) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  // console.log(feedData);

  return (
    <SectionFeed>
      {postList ? (
        postList.map((postData: Post) => {
          const {
            id,
            content,
            image,
            createdAt,
            hearted,
            heartCount,
            commentCount,
            author,
          } = postData;

          return (
            <FeedCard
              key={`feed-item-${id}-${Math.random()}`}
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
        <Loader height="calc(100vh - 109px)" />
      )}
      <TargetElement ref={setTarget}>
        {isLoading && !isReachingEnd && <Loader height="auto" />}
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
