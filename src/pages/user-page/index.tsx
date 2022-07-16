import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';
import { Loader } from '../../components/common/Loader';
import { HeaderUserPage } from '../../components/layouts/Header';
import { Navigation } from '../../components/layouts/Navigation';
import {
  PopupPost,
  PopupPostDelete,
  PopupProducDelete,
  PopupProduct,
} from '../../components/Popup';
import { SectionFeed } from '../../components/SectionFeed';
import { SectionProducts } from '../../components/SectionProducts';
import {
  SectionMyInfo,
  SectionUserInfo,
} from '../../components/SectionUserInfo';
import { API_ENDPOINT } from '../../constants';
import { fetcher } from '../../utils';

const UserPage: NextPage = () => {
  const accountname = Cookies.get('accountname') || '';
  const { data, error } = useSWR(
    `${API_ENDPOINT}/profile/${accountname}`,
    fetcher,
  );

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  const { followerCount, followingCount, image, intro, username, isfollow } =
    data.profile;

  return (
    <>
      <Head>
        <title>
          {username}({accountname})ㅣ낑깡팜
        </title>
      </Head>
      <HeaderUserPage headerTitle={username} />
      <MainMyPage>
        <SectionMyInfo
          userInfoData={{
            accountname,
            followerCount,
            followingCount,
            image,
            intro,
            username,
            isfollow,
          }}
        />
        {/* <SectionProducts /> */}
        <SectionFeed />
      </MainMyPage>
      {/* <PopupPost />
      <PopupPostDelete />
      <PopupProduct />
      <PopupProducDelete /> */}
      <Navigation />
    </>
  );
};

export default UserPage;

const MainMyPage = styled.main`
  min-height: calc(100vh - 109px);
  margin: 49px 0 60px;
  background-color: #f2f2f2;
`;
