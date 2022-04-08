import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { API_ENDPOINT } from '../../constants';
import { Post } from '../../types/Post';
import { fetcher } from '../../utils';
import { Loading } from '../common/Loading';
import { FeedCard } from './FeedCard';

export const FeedContainer = () => {
  const { data, error } = useSWR(`${API_ENDPOINT}/post/feed`, fetcher);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    if (data) {
      setPostList(data.posts);
    }
  }, [data]);

  if (!data) return <Loading />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <SectionFeed>
      {postList.map((postData: Post) => {
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
      })}
    </SectionFeed>
  );
};

const SectionFeed = styled.section`
  width: 100%;
`;
