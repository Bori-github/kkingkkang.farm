import { css } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useState } from 'react';
import { API_ENDPOINT, BORDER, USER_AVATAR } from '../constants';
import { GRAY_900, PRIMARY, WHITE } from '../constants/colors';
import { UserAvatar } from './UserAvatar';

interface UserInfoProps {
  userInfoData: {
    accountname: string | string[] | undefined;
    followerCount: number;
    followingCount: number;
    image: string;
    intro: string;
    isfollow: boolean;
    username: string;
  };
}

export const SectionUserInfo = ({ userInfoData }: UserInfoProps) => {
  const {
    accountname,
    followerCount,
    followingCount,
    image,
    intro,
    isfollow,
    username,
  } = userInfoData;
  const [followed, setFollowed] = useState(isfollow);

  const token = Cookies.get('token');
  const removeFollow = async (accountname: string | string[] | undefined) => {
    await axios(`${API_ENDPOINT}/profile/${accountname}/unfollow`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });
    setFollowed(false);
  };

  const getFollow = async (accountname: string | string[] | undefined) => {
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
    <Container>
      <h2 className="sr-only">유저 정보</h2>
      <BoxUser>
        <Link href={`/followers/${accountname}`} passHref>
          <LinkFollowers href="replace">
            <span className="count-followers">{followerCount}</span>
            <span>followers</span>
          </LinkFollowers>
        </Link>
        <UserAvatar size={USER_AVATAR.lg.size} src={image} />
        <Link href={`/followings/${accountname}`} passHref>
          <LinkFollowings href="replace">
            <span className="count-followings">{followingCount}</span>
            <span>followings</span>
          </LinkFollowings>
        </Link>
      </BoxUser>
      <span className="user-name">{username}</span>
      <span className="user-id">@{accountname}</span>
      <p className="user-desc">{intro}</p>
      <ListBtns>
        <li>
          <BtnMsg type="button">
            <span className="sr-only">메시지 보내기</span>
          </BtnMsg>
        </li>
        <li>
          {followed ? (
            <BtnCancel type="button" onClick={() => removeFollow(accountname)}>
              팔로잉
            </BtnCancel>
          ) : (
            <BtnFollow type="button" onClick={() => getFollow(accountname)}>
              팔로우
            </BtnFollow>
          )}
        </li>
        <li>
          <BtnShare type="button">
            <span className="sr-only">공유하기</span>
          </BtnShare>
        </li>
      </ListBtns>
    </Container>
  );
};

export const SectionMyInfo = ({ userInfoData }: UserInfoProps) => {
  const { accountname, followerCount, followingCount, image, intro, username } =
    userInfoData;

  return (
    <Container>
      <h2 className="sr-only">{username}의 정보</h2>
      <BoxUser>
        <Link href={`/followers/${accountname}`} passHref>
          <LinkFollowers href="replace">
            <span className="count-followers">{followerCount}</span>
            <span>followers</span>
          </LinkFollowers>
        </Link>
        <UserAvatar size={USER_AVATAR.lg.size} src={image} />
        <Link href={`/followings/${accountname}`} passHref>
          <LinkFollowings href="replace">
            <span className="count-followings">{followingCount}</span>
            <span>followings</span>
          </LinkFollowings>
        </Link>
      </BoxUser>
      <span className="user-name">{username}</span>
      <span className="user-id">@{accountname}</span>
      <p className="user-desc">{intro}</p>
      <ListMyBtns>
        <li>
          <Link href="/profile/edit" passHref>
            <BtnProfile>프로필 수정</BtnProfile>
          </Link>
        </li>
        <li>
          <Link href="/product" passHref>
            <BtnProduct>상품 등록</BtnProduct>
          </Link>
        </li>
      </ListMyBtns>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  background-color: ${WHITE};

  & .user-name {
    margin: 16px 0 6px;
    color: ${GRAY_900};
    font-size: 18px;
    font-weight: 700;
  }

  & .user-id {
    font-size: 12px;
  }

  & .user-desc {
    margin: 16px 0 24px;
    font-size: 14px;
  }
`;

const BoxUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LinkFollowers = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  margin-right: 40px;
  font-size: 10px;

  & .count-followers {
    color: ${GRAY_900};
    font-size: 18px;
    font-weight: 700;
  }
`;

const LinkFollowings = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  margin-left: 40px;
  font-size: 10px;

  & .count-followings {
    font-size: 18px;
    font-weight: 700;
  }
`;

const ListBtns = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BtnMsg = styled.button`
  width: 34px;
  height: 34px;
  border: ${BORDER.basic};
  border-radius: 50%;
  background: url('/icons/message-sm.svg') no-repeat 50% 50%;
`;

const BtnStyle = () => css`
  margin: 0 10px;
  padding: 10px 40px;
  border: ${BORDER.basic};
  border-radius: 32px;
`;

const BtnFollow = styled.button`
  ${BtnStyle}
  border-color:  ${PRIMARY};
  background-color: ${PRIMARY};
  color: ${WHITE};
`;

const BtnCancel = styled.button`
  ${BtnStyle}
`;

const BtnShare = styled.button`
  width: 34px;
  height: 34px;
  border: ${BORDER.basic};
  border-radius: 50%;
  background: url('/icons/share.svg') no-repeat 50% 50%;
`;

const ListMyBtns = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BtnProfile = styled.a`
  margin-right: 15px;
  padding: 6px 20px;
  border: ${BORDER.basic};
  border-radius: 30px;
  font-size: 14px;
`;

const BtnProduct = styled.a`
  padding: 6px 20px;
  border: ${BORDER.basic};
  border-radius: 30px;
  font-size: 14px;
`;
