import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { PRIMARY } from '../constants/colors';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>로그인ㅣ낑깡팜</title>
      </Head>
      <MainLogin>
        <FigLogo>
          <img src="/logo/logo.png" alt="낑깡팜 로고" />
        </FigLogo>
      </MainLogin>
      <SplashScreen />
    </>
  );
};

export default Login;

const MainLogin = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100vh;
  background-color: ${PRIMARY};
`;

const FigLogo = styled.figure`
  margin-bottom: 291px;
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
  background: url('/logo/logo-kkingkkang.png') no-repeat 50% 50% ${PRIMARY};
  animation: ${splash} 0.5s ease-in-out 0.5s forwards;
`;
