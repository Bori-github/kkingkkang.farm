import styled from '@emotion/styled';
import { BORDER, COLORS } from '../../constants';

export const HeaderFeed = () => {
  return (
    <Header>
      <TitleHeader>낑깡팜 피드</TitleHeader>
      <BtnSearchUser type="button">
        <span className="sr-only">유저 검색하기</span>
      </BtnSearchUser>
    </Header>
  );
};

export const HeaderSearch = () => {
  return (
    <Header>
      <BtnPrev type="button">
        <span className="sr-only">뒤로가기</span>
      </BtnPrev>
      <InpSearchUser type="search" placeholder="계정 검색" />
    </Header>
  );
};

export const HeaderUserPage = () => {
  return (
    <Header>
      <BtnPrev type="button">
        <span className="sr-only">뒤로가기</span>
      </BtnPrev>
      <BtnMore type="button">
        <span className="sr-only">옵션 더 보기</span>
      </BtnMore>
    </Header>
  );
};

export const HeaderBtnSave = () => {
  return (
    <Header>
      <BtnPrev type="button">
        <span className="sr-only">뒤로가기</span>
      </BtnPrev>
      <TitleHeader>프로필 편집</TitleHeader>
    </Header>
  );
};

export const HeaderListFollowers = () => {
  return (
    <Header>
      <BtnPrev type="button">
        <span className="sr-only">뒤로가기</span>
      </BtnPrev>
      <TitleHeader>Followers</TitleHeader>
    </Header>
  );
};

export const HeaderListFollowings = () => {
  return (
    <Header>
      <BtnPrev type="button">
        <span className="sr-only">뒤로가기</span>
      </BtnPrev>
      <TitleHeader>Followings</TitleHeader>
    </Header>
  );
};

export const HeaderChat = () => {
  return (
    <Header>
      <BtnPrev type="button">
        <span className="sr-only">뒤로가기</span>
      </BtnPrev>
      <TitleHeader>채팅 유저 이름</TitleHeader>
      <BtnMore type="button">
        <span className="sr-only">옵션 더 보기</span>
      </BtnMore>
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  padding: 12px 16px;
  border-bottom: ${BORDER.basic};
  background-color: #fff;
  color: ${COLORS.black};
  font-size: 18px;
  font-weight: 700;
`;

const BtnSearchUser = styled.button`
  width: 24px;
  height: 24px;
  background: url('/icons/header/search.svg') no-repeat 50% 50%;
`;

const BtnPrev = styled.button`
  width: 24px;
  height: 24px;
  background: url('/icons/header/arrow-left.svg') no-repeat 50% 50%;
`;

const InpSearchUser = styled.input`
  width: calc(100% - 40px);
  padding: 4px 16px;
  border: 0;
  border-radius: 30px;
  background-color: #f2f2f2;

  &::placeholder {
    color: #c4c4c4;
  }
`;

const BtnMore = styled.button`
  width: 24px;
  height: 24px;
  background: url('/icons/header/more.svg') no-repeat 50% 50%;
`;

const TitleHeader = styled.span`
  flex: 1;
  padding-left: 8px;
`;
