import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';
import { COLORS, BORDER, USER_AVATAR } from '../../constants';
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

  const toggleFollow = () => {
    return setFollowed((curr) => !curr);
  };

  return (
    <Following>
      <Link href={`/user-page/${accountname}`} passHref>
        <LinkFollowing>
          <UserAvatar size={USER_AVATAR.md.size} src={image} />
          <FollowingAccount>
            <FollowingName>{username}</FollowingName>
            <FollowingId>@{accountname}</FollowingId>
          </FollowingAccount>
        </LinkFollowing>
      </Link>
      {followed ? (
        <BtnCancel type="button" onClick={toggleFollow}>
          팔로잉
        </BtnCancel>
      ) : (
        <BtnFollow type="button" onClick={toggleFollow}>
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
  color: ${COLORS.black};
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
  background-color: ${COLORS.accent_green};
  color: #fff;
`;

const BtnCancel = styled.button`
  ${BtnStyle}
  border: ${BORDER.basic};
`;
