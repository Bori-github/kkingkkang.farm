import styled from '@emotion/styled';
import Link from 'next/link';
import { BORDER, COLORS } from '../constants';
import { UserAvatar } from './UserAvatar';

export const SectionUserInfo = () => {
  return (
    <Container>
      <h2 className="sr-only">유저 정보</h2>
      <BoxUser>
        <Link href="/list-followers">
          <LinkFollowers>
            <span className="count-followers">2950</span>
            <span>followers</span>
          </LinkFollowers>
        </Link>
        <UserAvatar size="90px" padding="10px" />
        <Link href="/list-followings">
          <LinkFollowings>
            <span className="count-followings">128</span>
            <span>followings</span>
          </LinkFollowings>
        </Link>
      </BoxUser>
      <span className="user-name">애월읍 낑깡농장</span>
      <span className="user-id">@kkingkkang_farm</span>
      <p className="user-desc">
        애월읍 낑깡 전국 배송, 낑깡따기 체험, 낑깡 농장
      </p>
      <ListBtns>
        <li>
          <BtnMsg type="button">
            <span className="sr-only">메시지 보내기</span>
          </BtnMsg>
        </li>
        <li>
          <BtnFollow type="button">팔로우</BtnFollow>
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

export const SectionMyInfo = () => {
  return (
    <Container>
      <h2 className="sr-only">나의 정보</h2>
      <BoxUser>
        <Link href="/list-followers">
          <LinkFollowers>
            <span className="count-followers">2950</span>
            <span>followers</span>
          </LinkFollowers>
        </Link>
        <UserAvatar size="90px" padding="10px" />
        <Link href="/list-followings">
          <LinkFollowings>
            <span className="count-followings">128</span>
            <span>followings</span>
          </LinkFollowings>
        </Link>
      </BoxUser>
      <span className="user-name">애월읍 낑깡농장</span>
      <span className="user-id">@kkingkkang_farm</span>
      <p className="user-desc">
        애월읍 낑깡 전국 배송, 낑깡따기 체험, 낑깡 농장
      </p>
      <ListMyBtns>
        <li>
          <BtnProfile type="button">프로필 수정</BtnProfile>
        </li>
        <li>
          <BtnProduct type="button">상품 등록</BtnProduct>
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
  background-color: #fff;

  & .user-name {
    margin: 16px 0 6px;
    color: ${COLORS.black};
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
    color: ${COLORS.black};
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
const BtnFollow = styled.button`
  margin: 0 10px;
  padding: 10px 40px;
  border-radius: 32px;
  background-color: ${COLORS.accent_light_green};
  color: #fff;
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
const BtnProfile = styled.button`
  margin-right: 15px;
  padding: 6px 20px;
  border: ${BORDER.basic};
  border-radius: 30px;
  font-size: 14px;
`;
const BtnProduct = styled.button`
  padding: 6px 20px;
  border: ${BORDER.basic};
  border-radius: 30px;
  font-size: 14px;
`;
