import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { API_ENDPOINT } from '../../constants';
import { FollowingData } from '../../types';
import { fetcher } from '../../utils';
import { Loader } from '../common/Loader';
import { FollowingCard } from './FollowingCard';

export const FollowingContainer = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    `${API_ENDPOINT}/profile/${id}/following?limit=1000&skip=0`,
    fetcher,
  );

  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    if (data) {
      setFollowingList(data);
    }
  }, [data]);

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <ListFollowing>
      {followingList.map((followingData: FollowingData) => {
        const { _id, accountname, image, isfollow, username } = followingData;
        return (
          <FollowingCard
            key={`following-list-${_id}`}
            followingData={{
              accountname,
              image,
              isfollow,
              username,
            }}
          />
        );
      })}
    </ListFollowing>
  );
};

const ListFollowing = styled.ul`
  display: grid;
  gap: 15px;
  padding: 20px 0;
`;
