import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { SignupEmail } from '../components/signup/SignupEmail';

const Signup: NextPage = () => {
  const [pages, setPages] = useState(true);
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  return (
    <>
      <Head>
        <title>이메일로 회원가입ㅣ낑깡팜</title>
      </Head>
      {pages ? (
        <SignupEmail setPages={setPages} setUserInfo={setUserInfo} />
      ) : (
        <div>
          <p>프로필 설정</p>
          {userInfo.email} / {userInfo.password}
        </div>
      )}
    </>
  );
};

export default Signup;
