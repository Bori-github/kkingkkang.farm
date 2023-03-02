import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ReactElement } from 'react';
import { Loader } from '../../components/common/Loader';
import { Navigation } from '../../components/layouts/Navigation';
import { ToolBar } from '../../components/layouts/ToolBar';
import { SectionFeed } from '../../components/feed/SectionFeed';
import { SectionProducts } from '../../components/SectionProducts';
import { SectionUserInfo } from '../../components/SectionUserInfo';
import { API_ENDPOINT } from '../../constants';
import { fetcher } from '../../utils';
import { Layout } from '../../components/layouts/Layout';
import { NextPageWithLayout } from '../_app';

const MyProfile: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`${API_ENDPOINT}/profile/${id}`, fetcher);

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  const {
    followerCount,
    followingCount,
    image,
    intro,
    isfollow,
    username,
    accountname,
  } = data.profile;

  return (
    <>
      <Head>
        <title>
          {username}({id})ㅣ낑깡팜
        </title>
      </Head>
      <ToolBar title={username} />
      <MainMyPage>
        <SectionUserInfo
          userInfoData={{
            accountname: id,
            followerCount,
            followingCount,
            image,
            intro,
            isfollow,
            username,
          }}
        />
        <SectionProducts accountname={accountname} />
        <SectionFeed accountname={accountname} />
      </MainMyPage>
    </>
  );
};

MyProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
      <Navigation />
    </Layout>
  );
};

export default MyProfile;

const MainMyPage = styled.main`
  min-height: calc(100vh - 109px);
  margin: 49px 0 60px;
  background-color: #f2f2f2;
`;
