import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>로그인ㅣ낑깡팜</title>
      </Head>
      <main>
        <figure>
          <img src="/logo/logo-white.png" alt="낑깡팜 로고" />
        </figure>
        <section>
          <form>
            <button type="button">카카오톡 계정으로 로그인</button>
            <button type="button">구글 계정으로 로그인</button>
            <button type="button">페이스북 계정으로 로그인</button>
          </form>
          <ul>
            <li>
              <Link href="/">이메일로 로그인</Link>
            </li>
            <li>
              <Link href="/">회원가입</Link>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
};

export default Login;
