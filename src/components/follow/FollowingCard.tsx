import { css } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useState } from 'react';
import { BORDER, USER_AVATAR, API_ENDPOINT } from '../../constants';
import { GRAY_900, PRIMARY, WHITE } from '../../constants/colors';
import { UserAvatar } from '../UserAvatar';

interface FollowingProps {
  followingData: {
    accountname: string;
    image: string;
    username: string;
    isfollow: boolean;
  };
}

export const FollowingCard = ({ followingData }: FollowingProps) => {
  const { accountname, image, username, isfollow } = followingData;
  const [followed, setFollowed] = useState(isfollow);
  const token = Cookies.get('token');
  const removeFollow = async (accountname: string) => {
    await axios(`${API_ENDPOINT}/profile/${accountname}/unfollow`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    setFollowed(false);
  };

  const getFollow = async (accountname: string) => {
    await axios(`${API_ENDPOINT}/profile/${accountname}/follow`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    setFollowed(true);
  };

  return (
    <Following>
      <Link href={`/profile/${accountname}`} passHref>
        <LinkFollowing>
          <UserAvatar size={USER_AVATAR.md.size} src={image} />
          <FollowingAccount>
            <FollowingName>{username}</FollowingName>
            <FollowingId>@{accountname}</FollowingId>
          </FollowingAccount>
        </LinkFollowing>
      </Link>
      {followed ? (
        <BtnCancel type="button" onClick={() => removeFollow(accountname)}>
          팔로잉
        </BtnCancel>
      ) : (
        <BtnFollow type="button" onClick={() => getFollow(accountname)}>
          팔로우
        </BtnFollow>
      )}
    </Following>
  );
};

const Following = styled.li`
  display: grid;
  grid-template-columns: auto 56px;
  gap: 10px;
`;

const LinkFollowing = styled.a`
  display: grid;
  grid-template-columns: 50px auto;
  gap: 10px;
`;

const FollowingAccount = styled.div`
  display: grid;
  align-items: center;
  padding: 4px 0;
`;

const FollowingName = styled.span`
  color: ${GRAY_900};
  font-size: 14px;
  font-weight: 700;
`;

const FollowingId = styled.span`
  font-size: 12px;
`;

const BtnStyle = () => css`
  align-self: center;
  width: 100%;
  padding: 7px 0;
  border-radius: 30px;
`;

const BtnFollow = styled.button`
  ${BtnStyle}
  background-color: ${PRIMARY};
  color: ${WHITE};
`;

const BtnCancel = styled.button`
  ${BtnStyle}
  border: ${BORDER.basic};
`;
