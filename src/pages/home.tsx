import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>로그인ㅣ낑깡팜</title>
      </Head>
      <header>
        <span>낑깡팜 피드</span>
        <button type="button">
          <span className="sr-only">유저 검색하기</span>
        </button>
      </header>
      <main>
        <section>
          <img src="/logo/logo-gray.png" alt="낑깡팜 로고" />
          <p>유저를 검색해 팔로우 해보세요!</p>
          <button type="button">검색하기</button>
        </section>
      </main>
      <nav>
        <ul>
          <li>
            <Link href="/home">
              <a>홈</a>
            </Link>
          </li>
          <li>
            <Link href="/chat">
              <a>채팅</a>
            </Link>
          </li>
          <li>
            <Link href="/post">
              <a>게시물 작성</a>
            </Link>
          </li>
          <li>
            <Link href="/my-profile">
              <a>프로필</a>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Home;
