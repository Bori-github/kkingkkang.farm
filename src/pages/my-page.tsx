import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { HeaderUserPage } from '../components/layouts/Header';
import { Navigation } from '../components/layouts/Navigation';
import {
  PopupPost,
  PopupPostDelete,
  PopupProducDelete,
  PopupProduct,
} from '../components/Popup';
import { SectionFeed } from '../components/SectionFeed';
import { SectionProducts } from '../components/SectionProducts';
import { SectionMyInfo } from '../components/SectionUserInfo';

const MyProfile: NextPage = () => {
  return (
    <>
      <Head>
        <title>내 이름(내 아이디)ㅣ낑깡팜</title>
      </Head>
      <HeaderUserPage />
      <MainMyPage>
        <SectionMyInfo />
        <SectionProducts />
        <SectionFeed />
      </MainMyPage>
      <PopupPost />
      <PopupPostDelete />
      <PopupProduct />
      <PopupProducDelete />
      <Navigation />
    </>
  );
};

export default MyProfile;

const MainMyPage = styled.main`
  min-height: calc(100vh - 109px);
  margin: 49px 0 60px;
  background-color: #f2f2f2;
`;
