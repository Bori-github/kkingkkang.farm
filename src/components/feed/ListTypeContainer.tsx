import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { API_ENDPOINT } from '../../constants';
import { PostData } from '../../types';
import { fetcher } from '../../utils';
import { Loader } from '../common/Loader';
import { FeedCard } from './FeedCard';

interface ListTypeContainerProps {
  accountname: string;
}

const PAGE_SIZE = 10;

export const ListTypeContainer = ({ accountname }: ListTypeContainerProps) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: myFeedData,
    error,
    setSize,
  } = useSWRInfinite(
    (index) =>
      `${API_ENDPOINT}/post/${accountname}/userpost/?limit=${PAGE_SIZE}&skip=${
        index * PAGE_SIZE
      }`,
    fetcher,
    { revalidateAll: true },
  );

  const isEmpty = myFeedData?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (myFeedData && myFeedData[myFeedData.length - 1]?.post.length < PAGE_SIZE);

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

  if (!myFeedData) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <SectionFeed>
      {myFeedData ? (
        myFeedData.map((data) => {
          return data.post.map((postData: PostData) => {
            const { id } = postData;

            return <FeedCard key={`myfeed-item-${id}`} postData={postData} />;
          });
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
`;
