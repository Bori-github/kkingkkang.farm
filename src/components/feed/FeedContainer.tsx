import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { PostData } from '../../types';
import { Loader } from '../common/Loader';
import { FeedCard } from './FeedCard';

export const FeedContainer = () => {
  const [feedData, setFeedData] = useState<PostData[]>([]);

  const { data, error, isValidating, setTarget, isReachingEnd } =
    useInfiniteScroll();

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
          const { id } = data;
          return <FeedCard key={`feed-item-${id}`} postData={data} />;
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
