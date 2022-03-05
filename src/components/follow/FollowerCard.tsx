import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';
import { BORDER, COLORS, USER_AVATAR } from '../../constants';
import { UserAvatar } from '../UserAvatar';

interface FollowerProps {
  followerData: {
    accountname: string;
    image: string;
    username: string;
    isfollow: boolean;
  };
}

export const FollowerCard = ({ followerData }: FollowerProps) => {
  const { accountname, image, username, isfollow } = followerData;
  const [followed, setFollowed] = useState(isfollow);

  const toggleFollow = () => {
    return followed ? setFollowed(false) : setFollowed(true);
  };

  return (
    <Follower>
      <Link href={`/user-page/${accountname}`} passHref>
        <LinkFollower>
          <UserAvatar size={USER_AVATAR.md.size} src={image} />
          <FollowerAccount>
            <FollowerName>{username}</FollowerName>
            <FollowerId>@{accountname}</FollowerId>
          </FollowerAccount>
        </LinkFollower>
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
    </Follower>
  );
};

const Follower = styled.li`
  display: grid;
  grid-template-columns: auto 56px;
  gap: 10px;
`;

const LinkFollower = styled.a`
  display: grid;
  grid-template-columns: 50px auto;
  gap: 10px;
`;

const FollowerAccount = styled.div`
  display: grid;
  align-items: center;
  padding: 4px 0;
`;

const FollowerName = styled.span`
  color: ${COLORS.black};
  font-size: 14px;
  font-weight: 700;
`;

const FollowerId = styled.span`
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
