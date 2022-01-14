import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { COLORS } from '../constants';

const MainLogin = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100vh;
  background-color: ${COLORS.accent_light_green};
`;

const FigLogo = styled.figure`
  margin-bottom: 291px;
`;

const SectionLogin = styled.section`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 45px 34px;
  border-radius: 20px 20px 0 0;
  background-color: #fff;
`;
const FormSnsLogin = styled.form`
  display: flex;
  flex-direction: column;
`;
const BtnSnsLogin = styled.button`
  width: 100%;
  margin: 5px 0;
  padding: 13px 0;
  border: 1px solid #f2c94c;
  border-radius: 44px;
  background: url('/sns/kakao.png') no-repeat 17px 50%;
  background-size: 24px 24px;

  &:nth-of-type(2) {
    border-color: #767676;
    background-image: url('/sns/google.png');
  }
  &:nth-of-type(3) {
    border-color: #2d9cdb;
    background-image: url('/sns/facebook.png');
  }
`;
const ListLink = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  font-size: 12px;

  & li:nth-of-type(1)::after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 12px;
    margin: 0 12px;
    background-color: #c4c4c4;
  }
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
  background: url('/logo/logo-kkingkkang.png') no-repeat 50% 50%
    ${COLORS.accent_green};
  animation: ${splash} 0.5s ease-in-out 0.5s forwards;
`;

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
        <SectionLogin>
          <h2 className="sr-only">낑깡팜 로그인 창</h2>
          <FormSnsLogin>
            <BtnSnsLogin type="button">카카오톡 계정으로 로그인</BtnSnsLogin>
            <BtnSnsLogin type="button">구글 계정으로 로그인</BtnSnsLogin>
            <BtnSnsLogin type="button">페이스북 계정으로 로그인</BtnSnsLogin>
          </FormSnsLogin>
          <ListLink>
            <li>
              <Link href="/">이메일로 로그인</Link>
            </li>
            <li>
              <Link href="/">회원가입</Link>
            </li>
          </ListLink>
        </SectionLogin>
      </MainLogin>
      <SplashScreen />
    </>
  );
};

export default Login;
