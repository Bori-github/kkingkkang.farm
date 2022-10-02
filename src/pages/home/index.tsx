import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import { Loader } from '../../components/common/Loader';
import { FeedContainer } from '../../components/feed/FeedContainer';
import { Navigation } from '../../components/layouts/Navigation';
import { ToolBar } from '../../components/layouts/ToolBar';
import { SplashScreen } from '../../components/SplashScreen';
import { API_ENDPOINT, BUTTON } from '../../constants';
import { WHITE } from '../../constants/colors';
import { fetcher } from '../../utils';

const Home: NextPage = () => {
  const accountname = Cookies.get('accountname');
  const { data, error } = useSWR(
    `${API_ENDPOINT}/profile/${accountname}`,
    fetcher,
  );

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <>
      <Head>
        <title>낑깡팜 피드ㅣ낑깡팜</title>
      </Head>
      <ToolBar title="낑깡팜 피드">
        <Link href="/user/search" passHref>
          <BtnSearch href="replace">
            <span className="sr-only">계정 검색</span>
          </BtnSearch>
        </Link>
      </ToolBar>
      <MainHome>
        {data.profile.followingCount < 1 ? (
          <SectionHome>
            <ImgLogo src="/logo/logo-gray.png" alt="낑깡팜 로고" />
            <p>유저를 검색해 팔로우 해보세요!</p>
            <Link href="/user/search" passHref>
              <SearchAnchor href="replace">검색하기</SearchAnchor>
            </Link>
          </SectionHome>
        ) : (
          <FeedContainer />
        )}
      </MainHome>
      <Navigation />
      <SplashScreen />
    </>
  );
};

export default Home;

const MainHome = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 109px);
  margin: 49px 0 60px;
`;

const SectionHome = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 49px;
  right: 0;
  bottom: 60px;
  left: 0;
  background-color: ${WHITE};
  font-size: 14px;
`;

const ImgLogo = styled.img`
  width: 100px;
  margin-bottom: 15px;
`;

const SearchAnchor = styled.a`
  display: block;
  margin-top: 20px;
  padding: 10px 30px;
  border-radius: 44px;
  background-color: ${BUTTON.background_color};
  color: ${BUTTON.color};
  font-weight: 700;
`;

const BtnSearch = styled.a`
  display: block;
  width: 24px;
  height: 24px;
  background: url('/icons/header/search.svg');
`;
