import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { BORDER, Z_INDEX } from '../../constants';
import { GRAY_300, GRAY_50, GRAY_900, WHITE } from '../../constants/colors';

interface HeaderProps {
  headerTitle: string;
}

interface HeaderMoreProps extends HeaderProps {
  handleModal: () => void;
}

export const HeaderFeed = ({ headerTitle }: HeaderProps) => {
  const router = useRouter();

  return (
    <Header>
      <TitleHeader>{headerTitle}</TitleHeader>
      <BtnSearchUser type="button" onClick={() => router.push('/search-user')}>
        <span className="sr-only">유저 검색하기</span>
      </BtnSearchUser>
    </Header>
  );
};

export const HeaderSearch = () => {
  const router = useRouter();

  return (
    <Header>
      <BtnPrev type="button" onClick={() => router.back()}>
        <span className="sr-only">뒤로가기</span>
      </BtnPrev>
      <InpSearchUser type="search" placeholder="계정 검색" />
    </Header>
  );
};

export const HeaderUserPage = ({
  headerTitle,
  handleModal,
}: HeaderMoreProps) => {
  const router = useRouter();

  return (
    <Header>
      <BtnPrev type="button" onClick={() => router.back()}>
        <span className="sr-only">뒤로가기</span>
      </BtnPrev>
      <TitleHeader>{headerTitle}</TitleHeader>
      <BtnMore type="button" onClick={handleModal}>
        <span className="sr-only">옵션 더 보기</span>
      </BtnMore>
    </Header>
  );
};

export const HeaderBtnPrev = ({ headerTitle }: HeaderProps) => {
  const router = useRouter();

  return (
    <Header>
      <BtnPrev type="button" onClick={() => router.back()}>
        <span className="sr-only">뒤로가기</span>
      </BtnPrev>
      <TitleHeader>{headerTitle}</TitleHeader>
    </Header>
  );
};

export const HeaderChat = ({ headerTitle }: HeaderProps) => {
  const router = useRouter();

  return (
    <Header>
      <BtnPrev type="button" onClick={() => router.back()}>
        <span className="sr-only">뒤로가기</span>
      </BtnPrev>
      <TitleHeader>{headerTitle}</TitleHeader>
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
  z-index: ${Z_INDEX.header};
  padding: 12px 16px;
  border-bottom: ${BORDER.basic};
  background-color: ${WHITE};
  color: ${GRAY_900};
  font-size: 16px;
  font-weight: 700;
  line-height: 17px;
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
  flex: 1;
  margin-left: 8px;
  padding: 4px 16px;
  border: 0;
  border-radius: 30px;
  background-color: ${GRAY_50};

  &::placeholder {
    color: ${GRAY_300};
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
