import styled from '@emotion/styled';
import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { API_ENDPOINT, BORDER, BUTTON, COLORS } from '../constants';

const LoginEmail: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/');
    }
  }, []);

  const regExpEm =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const regExgPw = /^[A-Za-z0-9]{6,12}$/;

  const [loginError, setLoginError] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ email: string; password: string }>({ mode: 'onChange' });

  const onSubmit = handleSubmit(async (data) => {
    const res = await axios(`${API_ENDPOINT}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        user: {
          email: data.email,
          password: data.password,
        },
      }),
    });
    if (res.data.message) {
      setLoginError(true);
    } else {
      localStorage.setItem('account', res.data.user.accountname);
      localStorage.setItem('token', res.data.user.token);
      router.push('/');
    }
  });

  return (
    <>
      <Head>
        <title>로그인ㅣ낑깡팜</title>
      </Head>
      <MainLoginEmail>
        <TitleMain>로그인</TitleMain>
        <FormLogin onSubmit={onSubmit}>
          <BoxInp>
            <Label htmlFor="userEmail">
              이메일
              <Input
                type="email"
                id="userEmail"
                required
                {...register('email', { required: true, pattern: regExpEm })}
              />
            </Label>
          </BoxInp>
          {errors?.email?.type === 'required' && (
            <TxtError>* 이메일을 입력해주세요</TxtError>
          )}
          {errors?.email?.type === 'pattern' && (
            <TxtError>* 잘못된 이메일 형식입니다.</TxtError>
          )}
          <BoxInp>
            <Label htmlFor="userPw">
              비밀번호
              <Input
                type="password"
                id="userPw"
                required
                {...register('password', { required: true, pattern: regExgPw })}
              />
            </Label>
            {errors?.password?.type === 'pattern' && (
              <TxtError>
                * 비밀번호는 영문(대/소문자 구분), 숫자 조합하여 6~12자리로
                입력해 주세요.
              </TxtError>
            )}
            {loginError && (
              <TxtError>* 이메일 또는 비밀번호가 일치하지 않습니다.</TxtError>
            )}
          </BoxInp>
          <BtnLogin type="submit" disabled={!isValid}>
            로그인
          </BtnLogin>
        </FormLogin>
        <Link href="/signup" passHref>
          <LinkSignUp>이메일로 회원가입</LinkSignUp>
        </Link>
      </MainLoginEmail>
    </>
  );
};

export default LoginEmail;

const MainLoginEmail = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 34px;
`;
const LinkSignUp = styled.a`
  font-size: 12px;
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
`;
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px 0 8px;
  border: 0;
  border-bottom: ${BORDER.basic};
  color: ${COLORS.black};
  font-size: 14px;

  &:focus,
  &:active {
    border-color: ${BORDER.active_color};
  }
`;
const TxtError = styled.span`
  display: block;
  margin-top: 6px;
  color: ${COLORS.error};
  font-size: 12px;
`;
const BtnLogin = styled.button`
  width: 100%;
  margin: 30px 0 20px;
  padding: 13px 0;
  border-radius: 44px;
  background-color: ${BUTTON.background_color};
  color: ${BUTTON.color};
  font-weight: 700;
  transition: all 0.3s;
  &:disabled {
    background-color: ${BUTTON.disabled_color};
  }
  &:hover,
  &:active {
    background-color: ${BUTTON.background_color};
  }
`;
