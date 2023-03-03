import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FollowerContainer } from '../../components/follow/FollowerContainer';
import { ToolBar } from '../../components/layouts/ToolBar';

const UserListFollowers: NextPage = () => {
  const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, []);

  return (
    <>
      <Head>
        <title>팔로워ㅣ낑깡팜</title>
      </Head>
      <ToolBar title="팔로워" />
      <MainListFollowers>
        <FollowerContainer />
      </MainListFollowers>
    </>
  );
};

export default UserListFollowers;

const MainListFollowers = styled.main`
  margin: 49px 0 60px;
  padding: 0 16px;
`;
