import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { BORDER, BUTTON, COLORS } from '../constants';

const LoginEmail: NextPage = () => {
  return (
    <>
      <Head>
        <title>이메일로 회원가입ㅣ낑깡팜</title>
      </Head>
      <MainSignup>
        <TitleMain>이메일로 회원가입</TitleMain>
        <FormLogin>
          <BoxInp>
            <Label htmlFor="email">
              이메일
              <input
                type="email"
                id="email"
                placeholder="이메일 주소를 입력해 주세요."
                required
              />
            </Label>
            <TxtError>*이미 가입된 이메일 주소입니다.</TxtError>
          </BoxInp>
          <BoxInp>
            <Label htmlFor="password">
              비밀번호
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 설정해 주세요."
                required
              />
            </Label>
            <TxtError>*비밀번호는 6자 이상이어야 합니다.</TxtError>
          </BoxInp>
          <BtnNext type="submit">다음</BtnNext>
        </FormLogin>
      </MainSignup>
    </>
  );
};

export default LoginEmail;

const MainSignup = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 34px;
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
  & input::placeholder {
    color: ${COLORS.placeholder};
  }
  & input:focus,
  & input:active {
    border-color: ${COLORS.accent_green};
  }
`;
const TxtError = styled.span`
  display: inline-block;
  margin-top: 6px;
  color: ${COLORS.error};
  font-size: 12px;
`;
const BtnNext = styled.button`
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
