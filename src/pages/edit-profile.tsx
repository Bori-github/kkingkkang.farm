import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { HeaderBtnSave } from '../components/layouts/Header';
import { UserAvatar } from '../components/UserAvatar';
import { BORDER, COLORS, USER_AVATAR } from '../constants';

const EditProfile: NextPage = () => {
  return (
    <>
      <Head>
        <title>내 프로필 편집ㅣ낑깡팜</title>
      </Head>
      <HeaderBtnSave />
      <MainEditProfile>
        <h2 className="sr-only">내 프로필 편집</h2>
        <BoxProfileImg>
          <UserAvatar size={USER_AVATAR.lg.size} />
          <button type="button">
            <span className="sr-only">프로필 사진 업로드</span>
          </button>
        </BoxProfileImg>
        <FormSetProfile>
          <BoxInp>
            <Label htmlFor="name">
              사용자 이름
              <input
                type="text"
                id="name"
                placeholder="2~10자 이내여야 합니다."
                minLength={2}
                maxLength={12}
                required
              />
            </Label>
          </BoxInp>
          <BoxInp>
            <Label htmlFor="id">
              계정 ID
              <input
                type="text"
                id="id"
                placeholder="영문, 숫자, 특주문자(.),(_)만 사용 가능합니다."
                required
              />
            </Label>
            <TxtError>
              *영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.
            </TxtError>
            <TxtError>*이미 사용 중인 ID 입니다.</TxtError>
          </BoxInp>
          <BoxInp>
            <Label htmlFor="introduce">
              소개
              <input
                type="text"
                id="introduce"
                placeholder="자신과 판매할 상품에 대해 소개해 주세요!"
                required
              />
            </Label>
          </BoxInp>
        </FormSetProfile>
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

  & button {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: url('/icons/img/image.svg') no-repeat 50% 50%
      ${COLORS.accent_green};
  }
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
