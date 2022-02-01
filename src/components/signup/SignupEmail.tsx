import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { API_ENDPOINT, BORDER, BUTTON, COLORS } from '../../constants';

export const SignupEmail = ({
  setPages,
  setUserInfo,
}: {
  setPages: (value: boolean) => void;
  setUserInfo: (value: { email: string; password: string }) => void;
}) => {
  const regExpEm =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const regExgPw = /^[A-Za-z0-9]{6,12}$/;

  const [emailValid, setEmailValid] = useState('');
  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = useForm<{ email: string; password: string }>({ mode: 'onChange' });

  const handleBlur = async () => {
    if (errors?.email?.type === 'pattern') return;

    const res = await axios(`${API_ENDPOINT}/user/emailvalid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        user: {
          email: getValues().email,
        },
      }),
    });
    setEmailValid(res.data.message);
  };

  const handleChange = () => {
    setEmailValid('');
  };

  const goToSetProfile = () => {
    setPages(false);
    setUserInfo({
      email: getValues().email,
      password: getValues().password,
    });
  };

  return (
    <MainSignup>
      <TitleMain>이메일로 회원가입</TitleMain>
      <FormLogin>
        <BoxInp>
          <Label htmlFor="email">
            이메일
            <Input
              type="email"
              id="email"
              placeholder="이메일 주소를 입력해 주세요."
              required
              {...register('email', {
                required: true,
                pattern: regExpEm,
                onBlur: handleBlur,
                onChange: handleChange,
              })}
            />
          </Label>
          {errors?.email?.type === 'required' && (
            <TxtError>* 이메일을 입력해주세요</TxtError>
          )}
          {errors?.email?.type === 'pattern' && (
            <TxtError>* 잘못된 이메일 형식입니다.</TxtError>
          )}
          {emailValid === '사용 가능한 이메일 입니다.' && (
            <TxtSuccess>* 사용 가능한 이메일 입니다.</TxtSuccess>
          )}
          {emailValid === '이미 가입된 이메일 주소 입니다.' && (
            <TxtError>* 이미 가입된 이메일 주소입니다.</TxtError>
          )}
        </BoxInp>
        <BoxInp>
          <Label htmlFor="password">
            비밀번호
            <Input
              type="password"
              id="password"
              placeholder="비밀번호를 설정해 주세요."
              required
              {...register('password', { required: true, pattern: regExgPw })}
            />
          </Label>
          {errors?.password?.type === 'pattern' && (
            <TxtError>
              * 비밀번호는 영문(대/소문자 구분), 숫자 조합하여 6~12자리로 입력해
              주세요.
            </TxtError>
          )}
        </BoxInp>
        <BtnNext
          type="button"
          onClick={goToSetProfile}
          disabled={!isValid || emailValid !== '사용 가능한 이메일 입니다.'}
        >
          다음
        </BtnNext>
      </FormLogin>
    </MainSignup>
  );
};

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
`;
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px 0 8px;
  border: 0;
  border-bottom: ${BORDER.basic};
  color: ${COLORS.black};
  font-size: 14px;

  &::placeholder {
    color: ${COLORS.placeholder};
  }
  &:focus,
  &:active {
    border-color: ${COLORS.accent_green};
  }
`;
const TxtError = styled.span`
  display: block;
  margin-top: 6px;
  color: ${COLORS.error};
  font-size: 12px;
`;
const TxtSuccess = styled.span`
  display: block;
  margin-top: 6px;
  color: ${COLORS.accent_light_green};
  font-size: 12px;
`;
const BtnNext = styled.button`
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
