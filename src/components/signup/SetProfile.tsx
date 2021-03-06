import styled from '@emotion/styled';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { API_ENDPOINT, BORDER, BUTTON } from '../../constants';
import {
  ERROR,
  GRAY_300,
  GRAY_900,
  PRIMARY,
  SECONDARY,
} from '../../constants/colors';

export const SetProfile = ({
  userInfo,
}: {
  userInfo: { email: string; password: string };
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<{
    username: string;
    email: string;
    password: string;
    accountname: string;
    intro: string;
    image: string;
  }>({ mode: 'onChange' });

  const regExpId = /^[0-9a-z-_]{5,20}$/;

  const [profileImg, setProfileImg] = useState('/default-profile-w.png');
  const onUploadImg = async () => {
    const imgData = new FormData();
    imgData.append('image', getValues().image[0]);

    const uploadImg = await axios(`${API_ENDPOINT}/image/uploadfile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: imgData,
    });
    setProfileImg(`${API_ENDPOINT}/${uploadImg.data.filename}`);
  };

  const [accountValid, setAccountValid] = useState('');
  const handleBlur = async () => {
    if (errors?.accountname?.type === 'pattern') return;

    const res = await axios(`${API_ENDPOINT}/user/accountnamevalid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        user: {
          accountname: getValues().accountname,
        },
      }),
    });
    setAccountValid(res.data.message);
  };

  const handleChange = () => {
    setAccountValid('');
  };

  const signup = handleSubmit(async (data) => {
    const res = await axios(`${API_ENDPOINT}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        user: {
          username: data.username,
          email: userInfo.email,
          password: userInfo.password,
          accountname: data.accountname,
          intro: data.intro,
          image:
            profileImg === '/default-profile-w.png'
              ? 'https://api.mandarin.cf/1643894416183.png'
              : profileImg,
        },
      }),
    });

    if (res.data.message === '???????????? ??????') {
      router.push('/login-email');
    }
  });
  return (
    <MainSetProfile>
      <TitleMain>????????? ??????</TitleMain>
      <TxtSetProfile>????????? ???????????? ????????? ??? ????????????.</TxtSetProfile>
      <BoxProfileImg>
        <ImgProfile src={profileImg} alt="????????? ????????? ?????????" />
        <Label htmlFor="uploadImag" className="btn-profile-img">
          <span className="sr-only">????????? ?????? ?????????</span>
        </Label>
        <input
          type="file"
          id="uploadImag"
          accept="image/*"
          className="sr-only"
          {...register('image', {
            onChange: onUploadImg,
          })}
        />
      </BoxProfileImg>
      <FormSetProfile onSubmit={signup}>
        <BoxInp>
          <Label htmlFor="username">
            ????????? ??????
            <input
              type="text"
              id="username"
              placeholder="2~10??? ???????????? ?????????."
              required
              {...register('username', {
                required: true,
                minLength: 2,
                maxLength: 10,
              })}
            />
          </Label>
          {(errors?.username?.type === 'minLength' ||
            errors?.username?.type === 'maxLength') && (
            <TxtError>* 2~10??? ???????????? ?????????.</TxtError>
          )}
        </BoxInp>
        <BoxInp>
          <Label htmlFor="accountname">
            ?????? ID
            <input
              type="text"
              id="accountname"
              placeholder="5~20?????? ?????? ?????????, ????????? ????????????(_),(.)??? ?????? ???????????????."
              required
              {...register('accountname', {
                required: true,
                pattern: regExpId,
                onBlur: handleBlur,
                onChange: handleChange,
              })}
            />
          </Label>
          {errors?.accountname?.type === 'pattern' && (
            <TxtError>
              * 5~20?????? ?????? ?????????, ????????? ????????????(_),(.)??? ?????? ???????????????.
            </TxtError>
          )}
          {accountValid === '?????? ????????? ??????ID ?????????.' && (
            <TxtSuccess>* ?????? ????????? ??????ID ?????????.</TxtSuccess>
          )}
          {accountValid === '?????? ????????? ??????ID ?????????.' && (
            <TxtError>* ?????? ?????? ?????? ??????ID ?????????.</TxtError>
          )}
        </BoxInp>
        <BoxInp>
          <Label htmlFor="introduce">
            ??????
            <input
              type="text"
              id="introduce"
              placeholder="????????? ????????? ????????? ?????? ????????? ?????????!"
              required
              {...register('intro', { required: true })}
            />
          </Label>
        </BoxInp>
        <BtnStart type="submit" disabled={!isValid}>
          ????????? ????????????
        </BtnStart>
      </FormSetProfile>
    </MainSetProfile>
  );
};

export default SetProfile;

const MainSetProfile = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 34px;
`;
const TitleMain = styled.h2`
  margin-bottom: 40px;
  color: ${GRAY_900};
  font-size: 24px;
  font-weight: 700;
`;
const TxtSetProfile = styled.p`
  font-size: 14px;
`;
const BoxProfileImg = styled.div`
  position: relative;
  margin: 30px 0;
`;
const ImgProfile = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: ${GRAY_300};
  object-fit: cover;
`;
const FormSetProfile = styled.form`
  width: 100%;
`;
const BoxInp = styled.div`
  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;
const Label = styled.label`
  font-size: 12px;

  &.btn-profile-img {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: url('/icons/img/image.svg') no-repeat 50% 50% ${PRIMARY};
  }

  & input {
    display: block;
    width: 100%;
    padding: 10px 0 8px;
    border: 0;
    border-bottom: ${BORDER.basic};
    color: ${GRAY_900};
    font-size: 14px;
  }
  & input::placeholder {
    color: ${GRAY_300};
  }
  & input:focus,
  & input:active {
    border-color: ${PRIMARY};
  }
`;
const TxtError = styled.span`
  display: block;
  margin-top: 6px;
  color: ${ERROR};
  font-size: 12px;
`;
const TxtSuccess = styled.span`
  display: block;
  margin-top: 6px;
  color: ${SECONDARY};
  font-size: 12px;
`;
const BtnStart = styled.button`
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
