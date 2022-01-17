import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { HeaderUserPage } from '../components/layouts/Header';
import { Navigation } from '../components/layouts/Navigation';
import { PopupLogout, PopupMoreUser } from '../components/Popup';
import { SectionAlbum } from '../components/SectionAlbum';
import { SectionFeed } from '../components/SectionFeed';
import { SectionProducts } from '../components/SectionProducts';
import { SectionUserInfo } from '../components/SectionUserInfo';

const UserPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>유저 이름(유저 아이디)ㅣ낑깡팜</title>
      </Head>
      <HeaderUserPage />
      <MainUserPage>
        <SectionUserInfo />
        <SectionProducts />
        {/* <SectionFeed /> */}
        <SectionAlbum />
      </MainUserPage>
      <PopupMoreUser />
      <PopupLogout />
      <Navigation />
    </>
  );
};

export default UserPage;

const MainUserPage = styled.main`
  min-height: calc(100vh - 109px);
  margin: 49px 0 60px;
  background-color: #f2f2f2;
`;
