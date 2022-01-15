import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BORDER, BUTTON, COLORS } from '../constants';

const MainLoginEmail = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 34px;

  .LinkSignUp {
    font-size: 12px;
  }
`;
const TitleMain = styled.h2`
  margin-bottom: 40px;
  color: ${COLORS.black};
  font-size: 24px;
  font-weight: 700;
`;
const FormLogin = styled.form`
  width: 100%;
`;
const BoxInp = styled.div`
  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;
const Label = styled.label`
  font-size: 12px;

  & input {
    display: block;
    width: 100%;
    padding: 10px 0 8px;
    border: 0;
    border-bottom: ${BORDER.basic};
    color: ${COLORS.black};
    font-size: 14px;
  }
  & input:focus,
  & input:active {
    border-color: ${BORDER.active_color};
  }
`;
const TxtError = styled.span`
  display: inline-block;
  margin-top: 6px;
  color: ${COLORS.error};
  font-size: 12px;
`;
const BtnLogin = styled.button`
  width: 100%;
  margin: 30px 0 20px;
  padding: 13px 0;
  border-radius: 44px;
  background-color: ${BUTTON.disabled_color};
  color: ${BUTTON.color};
  font-weight: 700;
  transition: all 0.3s;

  &:hover,
  &:active {
    background-color: ${BUTTON.background_color};
  }
`;

const LoginEmail: NextPage = () => {
  return (
    <>
      <Head>
        <title>로그인ㅣ낑깡팜</title>
      </Head>
      <MainLoginEmail>
        <TitleMain>로그인</TitleMain>
        <FormLogin>
          <BoxInp>
            <Label htmlFor="userEmail">
              이메일
              <input type="email" id="userEmail" required />
            </Label>
          </BoxInp>
          <BoxInp>
            <Label htmlFor="userPw">
              비밀번호
              <input type="password" id="userPw" required />
            </Label>
            <TxtError>*이메일 또는 비밀번호가 일치하지 않습니다.</TxtError>
          </BoxInp>
          <BtnLogin type="submit">로그인</BtnLogin>
        </FormLogin>
        <Link href="/signup">
          <a className="LinkSignUp">이메일로 회원가입</a>
        </Link>
      </MainLoginEmail>
    </>
  );
};

export default LoginEmail;
