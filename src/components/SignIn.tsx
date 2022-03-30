import styled from '@emotion/styled';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { API_ENDPOINT, BORDER, BUTTON } from '../constants';
import { ERROR, GRAY_900, WHITE } from '../constants/colors';

export const SignIn = () => {
  const router = useRouter();
  if (Cookies.get('token')) {
    router.push('/home');
  }

  const [loginError, setLoginError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ email: string; password: string }>({ mode: 'onChange' });

  const onSubmit = handleSubmit(async (userData) => {
    const { data } = await axios(`${API_ENDPOINT}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        user: {
          email: userData.email,
          password: userData.password,
        },
      }),
    });

    if (data.message) {
      setLoginError('이메일 또는 비밀번호가 일치하지 않습니다.');
    } else {
      Cookies.set('accountname', data.user.accountname);
      Cookies.set('token', data.user.token);
    }
  });

  const handleChange = () => {
    setLoginError('');
  };

  const regExpEm =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const regExgPw = /^[A-Za-z0-9]{6,12}$/;

  return (
    <SectionLoginEmail>
      <h2 className="sr-only">낑깡팜 로그인</h2>
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
              {...register('password', {
                required: true,
                pattern: regExgPw,
                onChange: handleChange,
              })}
            />
          </Label>
          {errors?.password?.type === 'pattern' && (
            <TxtError>
              * 비밀번호는 영문(대/소문자 구분), 숫자 조합하여 6~12자리로 입력해
              주세요.
            </TxtError>
          )}
          {loginError === '이메일 또는 비밀번호가 일치하지 않습니다.' && (
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
    </SectionLoginEmail>
  );
};

const SectionLoginEmail = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 30px 35px;
  border-radius: 10px;
  background-color: ${WHITE};
`;

const LinkSignUp = styled.a`
  font-size: 12px;
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
  width: 100%;
  padding: 8px 0;
  border: 0;
  border-bottom: ${BORDER.basic};
  background: none;
  color: ${GRAY_900};
  font-size: 14px;
  outline: none;

  &:focus,
  &:active {
    border-color: ${BORDER.active_color};
  }
`;

const TxtError = styled.span`
  display: block;
  margin-top: 6px;
  color: ${ERROR};
  font-size: 12px;
  line-height: 1.3;
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
