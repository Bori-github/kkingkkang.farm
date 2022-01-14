import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const LoginEmail: NextPage = () => {
  return (
    <>
      <Head>
        <title>로그인ㅣ낑깡팜</title>
      </Head>
      <main>
        <h2>로그인</h2>
        <form>
          <div>
            <label htmlFor="userEmail">
              이메일
              <input type="email" id="userEmail" required />
            </label>
          </div>
          <div>
            <label htmlFor="userPw">
              비밀번호
              <input type="password" id="userPw" required />
            </label>
            <strong>*이메일 또는 비밀번호가 일치하지 않습니다.</strong>
          </div>
          <button type="submit">로그인</button>
        </form>
        <Link href="/">이메일로 회원가입</Link>
      </main>
    </>
  );
};

export default LoginEmail;
