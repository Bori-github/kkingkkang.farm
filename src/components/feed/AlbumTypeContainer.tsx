import styled from '@emotion/styled';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { API_ENDPOINT } from '../../constants';
import { PostData } from '../../types';
import { fetcher } from '../../utils';
import { Loader } from '../common/Loader';

interface AlbumTypeContainerProps {
  accountname: string;
}

const PAGE_SIZE = 10;

export const AlbumTypeContainer = ({
  accountname,
}: AlbumTypeContainerProps) => {
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
            const { id: postId, image } = postData;
            const imageList = image.split(',');

            return (
              imageList[0].length > 0 && (
                <div key={`post-item-${postId}`}>
                  <Link href={`/post/${postId}`}>
                    <Anchor href="replace" multiImages={imageList.length > 1}>
                      <Image src={imageList[0]} alt="" />
                    </Anchor>
                  </Link>
                </div>
              )
            );
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 5px;
`;

const Anchor = styled.a<{ multiImages: boolean }>`
  position: relative;
  display: block;
  margin: 5px 0;

  &::after {
    content: '';
    display: ${({ multiImages }) => (multiImages ? 'block' : 'none')};
    position: absolute;
    top: 6px;
    right: 6px;
    width: 20px;
    height: 20px;
    background: url('/icons/img/img-layers.svg') no-repeat center center;
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
`;

const TargetElement = styled.div`
  width: 100%;
`;
