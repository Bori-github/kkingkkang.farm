import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Loader } from '../../components/common/Loader';
import { Navigation } from '../../components/layouts/Navigation';
import { ToolBar } from '../../components/layouts/ToolBar';
import {
  PopupPost,
  PopupPostDelete,
  PopupProducDelete,
  PopupProduct,
} from '../../components/Popup';
import { SectionFeed } from '../../components/SectionFeed';
import { SectionProducts } from '../../components/SectionProducts';
import { SectionUserInfo } from '../../components/SectionUserInfo';
import { API_ENDPOINT } from '../../constants';
import { fetcher } from '../../utils';

const MyProfile: NextPage = () => {
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
        {/* <SectionProducts /> */}
        <SectionFeed accountname={accountname} />
      </MainMyPage>
      {/* <PopupPost />
      <PopupPostDelete />
      <PopupProduct />
      <PopupProducDelete /> */}
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
