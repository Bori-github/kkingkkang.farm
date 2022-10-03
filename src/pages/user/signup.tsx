import { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { SignupEmail } from '../../components/signup/SignupEmail';
import { SetProfile } from '../../components/signup/SetProfile';

const Signup: NextPage = () => {
  const [pages, setPages] = useState(true);
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  return (
    <>
      <Head>
        <title>{pages ? '이메일로 회원가입' : '프로필 설정'}ㅣ낑깡팜</title>
      </Head>
      {pages ? (
        <SignupEmail setPages={setPages} setUserInfo={setUserInfo} />
      ) : (
        <SetProfile userInfo={userInfo} />
      )}
    </>
  );
};

export default Signup;
