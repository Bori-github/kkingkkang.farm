import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { BORDER, BUTTON, COLORS } from '../constants';

const MainSetProfile = styled.main`
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
const TxtSetProfile = styled.p`
  font-size: 14px;
`;
const BoxProfileImg = styled.div`
  position: relative;
  margin: 30px 0;
  padding: 10px;
  border-radius: 50%;
  background-color: ${COLORS.light_gray};

  & button {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: url('/icons/image.svg') no-repeat 50% 50% ${COLORS.accent_green};
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
const BtnStart = styled.button`
  width: 100%;
  margin: 30px 0 20px;
  padding: 13px 0;
  border: ${BUTTON.border};
  border-radius: 44px;
  color: ${BUTTON.color};
  font-weight: 700;
  transition: all 0.3s;

  &:hover,
  &:active {
    background-color: ${BUTTON.background_color};
    color: ${BUTTON.active_color};
  }
`;

const SetProfile: NextPage = () => {
  return (
    <>
      <Head>
        <title>프로필 설정ㅣ낑깡팜</title>
      </Head>
      <MainSetProfile>
        <TitleMain>프로필 설정</TitleMain>
        <TxtSetProfile>나중에 언제든지 변경할 수 있습니다.</TxtSetProfile>
        <BoxProfileImg>
          <img src="/default-profile-w.png" alt="기본 프로필" />
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
          <BtnStart type="submit">낑깡팜 시작하기</BtnStart>
        </FormSetProfile>
      </MainSetProfile>
    </>
  );
};

export default SetProfile;
