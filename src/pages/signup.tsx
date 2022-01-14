import { NextPage } from 'next';
import Head from 'next/head';

const LoginEmail: NextPage = () => {
  return (
    <>
      <Head>
        <title>이메일로 회원가입ㅣ낑깡팜</title>
      </Head>
      <main>
        <h2>이메일로 회원가입</h2>
        <form>
          <div>
            <label htmlFor="email">
              이메일
              <input
                type="email"
                id="email"
                placeholder="이메일 주소를 입력해 주세요."
                required
              />
            </label>
            <span>*이미 가입된 이메일 주소입니다.</span>
          </div>
          <div>
            <label htmlFor="password">
              비밀번호
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 설정해 주세요."
                required
              />
            </label>
            <span>*비밀번호는 6자 이상이어야 합니다.</span>
          </div>
          <button type="submit">다음</button>
        </form>
      </main>
    </>
  );
};

export default LoginEmail;
