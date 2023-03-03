import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import useSWR from 'swr';
import { ChatCard } from '../../components/chat/ChatCard';
import { Loader } from '../../components/common/Loader';
import { Layout } from '../../components/layouts/Layout';
import { Navigation } from '../../components/layouts/Navigation';
import { ToolBar } from '../../components/layouts/ToolBar';
import { API_ENDPOINT } from '../../constants';
import { UserData } from '../../types/UserData';
import { fetcher } from '../../utils';
import { NextPageWithLayout } from '../_app';

const ChatListPage: NextPageWithLayout = () => {
  const router = useRouter();
  const token = Cookies.get('token');
  const accountname = Cookies.get('accountname');
  const { data: followerData, error } = useSWR(
    `${API_ENDPOINT}/profile/${accountname}/follower`,
    fetcher,
  );

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, []);

  if (!followerData) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <>
      <Head>
        <title>채팅ㅣ낑깡팜</title>
      </Head>
      <ToolBar title="채팅" />
      <MainListChat>
        <ListChats>
          {followerData.map((followerData: UserData) => {
            const { _id } = followerData;
            return (
              <ChatCard
                key={`follower-list-${_id}`}
                followerData={followerData}
              />
            );
          })}
        </ListChats>
      </MainListChat>
    </>
  );
};

ChatListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
      <Navigation />
    </Layout>
  );
};

export default ChatListPage;

const MainListChat = styled.main`
  margin: 49px 0 60px;
  padding: 0 16px;
`;

const ListChats = styled.ul`
  display: grid;
  gap: 15px;
  padding: 20px 0;
`;
