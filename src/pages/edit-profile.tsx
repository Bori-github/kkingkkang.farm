import styled from '@emotion/styled';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Loader } from '../components/common/Loader';
import { HeaderBtnPrev } from '../components/layouts/Header';
import { UserAvatar } from '../components/UserAvatar';
import { API_ENDPOINT, BORDER, BUTTON, USER_AVATAR } from '../constants';
import {
  ERROR,
  GRAY_300,
  GRAY_900,
  PRIMARY,
  SECONDARY,
} from '../constants/colors';
import { fetcher } from '../utils';

interface EditProfileValues {
  username: string;
  accountname: string;
  intro: string;
  image: string;
}

const EditProfile: NextPage = () => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EditProfileValues>({ mode: 'onChange' });

  const router = useRouter();
  const [profileImg, setProfileImg] = useState('/default-profile-w.png');
  const [accountValid, setAccountValid] = useState('');
  const accountname = Cookies.get('accountname') || '';
  const regExpId = /^[0-9a-z-_]{5,20}$/;

  const { data, error } = useSWR(
    `${API_ENDPOINT}/profile/${accountname}`,
    fetcher,
  );

  useEffect(() => {
    setProfileImg(image);
    setValue('username', username);
    setValue('accountname', accountName);
    setValue('intro', intro);
  }, [data]);

  const handelBlur = async () => {
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

  const handelChange = () => {
    setAccountValid('');
  };

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

  const onHandleSubmit = handleSubmit(async () => {
    const token = Cookies.get('token');
    const { username, accountname, intro } = getValues();
    await axios(`${API_ENDPOINT}/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      data: JSON.stringify({
        user: {
          username,
          accountname,
          intro,
          image: profileImg,
        },
      }),
    });
    Cookies.set('accountname', accountname);
    router.push('/user-page');
  });

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>????????? ??????????????????.</div>;

  const { accountname: accountName, image, intro, username } = data.profile;

  return (
    <>
      <Head>
        <title>??? ????????? ??????????????????</title>
      </Head>
      <HeaderBtnPrev headerTitle="??? ????????? ??????" />
      <MainEditProfile>
        <h2 className="sr-only">??? ????????? ??????</h2>
        <BoxProfileImg>
          <UserAvatar size={USER_AVATAR.lg.size} src={profileImg} />
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
        <FormEditProfile onSubmit={onHandleSubmit}>
          <BoxInp>
            <Label htmlFor="username">
              ????????? ??????
              <input
                type="text"
                id="username"
                placeholder="2~10??? ???????????? ?????????."
                {...register('username', {
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
                type="accountname"
                id="id"
                placeholder="5~20?????? ?????? ?????????, ????????? ????????????(_),(.)??? ?????? ???????????????."
                {...register('accountname', {
                  pattern: regExpId,
                  onBlur: handelBlur,
                  onChange: handelChange,
                })}
              />
            </Label>
            {errors?.accountname?.type === 'pattern' && (
              <TxtError>
                * 5~20?????? ?????? ?????????, ????????? ????????????(_),(.)??? ??????
                ???????????????.
              </TxtError>
            )}
            {accountValid === '?????? ????????? ??????ID ?????????.' && (
              <TxtError>* ?????? ?????? ?????? ??????ID ?????????.</TxtError>
            )}
            {accountValid === '?????? ????????? ??????ID ?????????.' && (
              <TxtSuccess>* ?????? ????????? ??????ID ?????????.</TxtSuccess>
            )}
          </BoxInp>
          <BoxInp>
            <Label htmlFor="introduce">
              ??????
              <input
                type="text"
                id="introduce"
                placeholder="????????? ????????? ????????? ?????? ????????? ?????????!"
                {...register('intro')}
              />
            </Label>
          </BoxInp>
          <BtnSave type="submit" disabled={!isValid}>
            ??????
          </BtnSave>
        </FormEditProfile>
      </MainEditProfile>
    </>
  );
};

export default EditProfile;

const MainEditProfile = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 49px;
  padding: 30px 34px;
`;

const BoxProfileImg = styled.div`
  position: relative;
  margin: 30px 0;
`;

const FormEditProfile = styled.form`
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
  display: inline-block;
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

const BtnSave = styled.button`
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
