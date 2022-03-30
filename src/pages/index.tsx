import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import { SignIn } from '../components/SignIn';
import { PRIMARY, WHITE } from '../constants/colors';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>로그인ㅣ낑깡팜</title>
      </Head>
      <MainLogin>
        <ImgLogo src="/logo/logo.png" alt="낑깡팜 로고" />
        <SignIn />
      </MainLogin>
      <SplashScreen />
    </>
  );
};

export default Login;

const MainLogin = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100vh;
  padding: 0 30px;
  background-color: ${PRIMARY};
`;

const ImgLogo = styled.img`
  width: 100px;
  margin-bottom: 20px;
`;

const splash = keyframes`
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const SplashScreen = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url('/logo/logo-kkingkkang.png') no-repeat 50% 50% ${WHITE};
  animation: ${splash} 0.5s ease-in-out 0.5s forwards;
`;
