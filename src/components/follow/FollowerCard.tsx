import styled from '@emotion/styled';
import Link from 'next/link';
import { BORDER, COLORS, USER_AVATAR } from '../../constants';
import { UserAvatar } from '../UserAvatar';

interface FollowerProps {
  followerData: {
    accountName: string;
    profileImg: string;
    userName: string;
    isFollow: boolean;
  };
}

export const FollowerCard = ({ followerData }: FollowerProps) => {
  const { accountName, profileImg, userName, isFollow } = followerData;

  return (
    <li>
      <Link href={`/profile/${accountName}`} passHref>
        <LinkFollower>
          <UserAvatar size={USER_AVATAR.md.size} src={profileImg} />
          <FollowerAccount>
            <FollowerName>{userName}</FollowerName>
            <FollowerId>@{accountName}</FollowerId>
          </FollowerAccount>
          {isFollow ? (
            <BtnCancel type="button">팔로잉</BtnCancel>
          ) : (
            <BtnFollow type="button">팔로우</BtnFollow>
          )}
        </LinkFollower>
      </Link>
    </li>
  );
};

const LinkFollower = styled.a`
  display: grid;
  grid-template-columns: 50px auto 56px;
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
const BtnFollow = styled.button`
  align-self: center;
  width: 100%;
  padding: 7px 0;
  border-radius: 30px;
  background-color: ${COLORS.accent_green};
  color: #fff;
`;
const BtnCancel = styled.button`
  align-self: center;
  width: 100%;
  padding: 7px 0;
  border: ${BORDER.basic};
  border-radius: 30px;
`;
