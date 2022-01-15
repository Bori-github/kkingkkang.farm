import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { HeaderFeed } from '../components/layouts/Header';
import { Navigation } from '../components/layouts/Navigation';
import { BUTTON } from '../constants';

const MainHome = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 109px);
  margin: 49px 0 60px;
`;

const SectionHome = styled.section`
  display: none;
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

  &.nofollowers {
    display: flex;
  }
`;
const BtnSearchFollower = styled.button`
  padding: 8px 30px;
  border-radius: 44px;
  background-color: ${BUTTON.background_color};
  color: ${BUTTON.color};
  font-weight: 700;
`;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>로그인ㅣ낑깡팜</title>
      </Head>
      <HeaderFeed />
      <MainHome>
        <SectionHome>
          <img src="/logo/logo-gray.png" alt="낑깡팜 로고" />
          <p>유저를 검색해 팔로우 해보세요!</p>
          <BtnSearchFollower type="button">검색하기</BtnSearchFollower>
        </SectionHome>
        <section>
          <article>
            <div>
              <img src="/default-profile-w.png" alt="사용자 프로필 이미지" />
            </div>
            <div>
              <span className="user-name">애월읍 위니브 농장</span>
              <span className="user-id">@weniv_Mandarin</span>
              <button type="button">
                <span className="sr-only">옵션 더 보기</span>
              </button>
            </div>
            <div>
              <p>피드 내용</p>
              <div>
                <img src="/example/post-img-example.png" alt="피드 이미지" />
              </div>
            </div>
            <ul>
              <li>
                <button type="button" className="btn-like">
                  <span className="sr-only">좋아요</span>
                </button>
                <span className="count-like">58</span>
              </li>
              <li>
                <button type="button" className="btn-reply">
                  <span className="sr-only">댓글</span>
                </button>
                <span className="count-reply">12</span>
              </li>
            </ul>
          </article>
        </section>
      </MainHome>
      <Navigation />
    </>
  );
};

export default Home;
