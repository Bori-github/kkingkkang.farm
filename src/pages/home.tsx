import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BORDER, BUTTON, COLORS } from '../constants';

const HeaderMain = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 12px 16px;
  border-bottom: ${BORDER.basic};
  background-color: #fff;
  color: ${COLORS.black};
  font-size: 18px;
  font-weight: 700;

  & .btn-search-user {
    width: 24px;
    height: 24px;
    background: url('/icons/header/search.svg') no-repeat 50% 50%;
  }
`;

const MainHome = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 109px);
  margin: 49px 0 60px;
`;

const SectionHome = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  & img {
    width: 100px;
  }
  & p {
    margin: 20px 0;
    font-size: 14px;
  }
`;
const BtnSearchFollower = styled.button`
  padding: 8px 30px;
  border-radius: 44px;
  background-color: ${BUTTON.background_color};
  color: ${BUTTON.color};
  font-weight: 700;
`;

const Nav = styled.nav`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  border-top: ${BORDER.basic};
  background-color: #fff;
`;
const ListMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 10px;

  & li {
    background: no-repeat 50% 30%;
    &.item-home {
      background-image: url('/icons/nav/home.svg');
    }
    &.item-chat {
      background-image: url('/icons/nav/chat.svg');
    }
    &.item-post {
      background-image: url('/icons/nav/post.svg');
    }
    &.item-profile {
      background-image: url('/icons/nav/profile.svg');
    }

    &.item-home.active {
      background-image: url('/icons/nav/home-fill.svg');
    }
    &.item-chat.active {
      background-image: url('/icons/nav/chat-fill.svg');
    }
    &.item-profile.active {
      background-image: url('/icons/nav/profile-fill.svg');
    }
  }

  & .link-menu {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 85px;
    height: 54px;
    padding-bottom: 6px;
  }
`;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>로그인ㅣ낑깡팜</title>
      </Head>
      <HeaderMain>
        <span>낑깡팜 피드</span>
        <button type="button" className="btn-search-user">
          <span className="sr-only">유저 검색하기</span>
        </button>
      </HeaderMain>
      <MainHome>
        <SectionHome className="nofollowers">
          <img src="/logo/logo-gray.png" alt="낑깡팜 로고" />
          <p>유저를 검색해 팔로우 해보세요!</p>
          <BtnSearchFollower type="button">검색하기</BtnSearchFollower>
        </SectionHome>
      </MainHome>
      <Nav>
        <ListMenu>
          <li className="item-home active">
            <Link href="/home">
              <a className="link-menu">
                <span>홈</span>
              </a>
            </Link>
          </li>
          <li className="item-chat">
            <Link href="/chat">
              <a className="link-menu">
                <span>채팅</span>
              </a>
            </Link>
          </li>
          <li className="item-post">
            <Link href="/post">
              <a className="link-menu">
                <span>게시물 작성</span>
              </a>
            </Link>
          </li>
          <li className="item-profile">
            <Link href="/my-profile">
              <a className="link-menu">
                <span>프로필</span>
              </a>
            </Link>
          </li>
        </ListMenu>
      </Nav>
    </>
  );
};

export default Home;
