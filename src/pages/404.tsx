import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { BUTTON } from '../constants';
import { WHITE } from '../constants/colors';

const Page404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404: This page could not found.ㅣ낑깡팜</title>
      </Head>
      <Main404>
        <Img404 src="/logo/logo-404.png" alt="404" />
        <Txt404>페이지를 찾을 수 없습니다 :&#40;</Txt404>
        <BtnPrev type="button">이전 페이지</BtnPrev>
      </Main404>
    </>
  );
};

export default Page404;

const Main404 = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
const Img404 = styled.img`
  width: 100px;
`;
const Txt404 = styled.p`
  margin: 20px 0;
  font-size: 14px;
`;
const BtnPrev = styled.button`
  width: 120px;
  height: 44px;
  margin-bottom: 60px;
  border-radius: 44px;
  background-color: ${BUTTON.background_color};
  color: ${WHITE};
`;
