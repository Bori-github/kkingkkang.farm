import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { API_ENDPOINT } from '../../constants';
import { Follower } from '../../types/Follower';
import { fetcher } from '../../utils/fetcher';
import { FollowerCard } from './FollowerCard';

export const FollowerContainer = () => {
  const accountname = Cookies.get('accountname') || '';
  const { data, error } = useSWR(
    `${API_ENDPOINT}/profile/${accountname}/follower/?limit=100`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      setFollowerList(data);
    }
  }, [data]);

  const [followerList, setFollowerList] = useState([]);

  if (!data) return <div>잠시만 기다려주세요.</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <ListFollower>
      {followerList.map((followerData: Follower) => {
        const { _id, username, accountname, image, isfollow } = followerData;
        return (
          <FollowerCard
            key={`follower-list-${_id}`}
            followerData={{
              accountName: accountname,
              profileImg: image,
              userName: username,
              isFollow: isfollow,
            }}
          />
        );
      })}
    </ListFollower>
  );
};

const ListFollower = styled.ul`
  display: grid;
  gap: 15px;
  padding: 20px 0;
`;
