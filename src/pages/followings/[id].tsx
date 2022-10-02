import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { FollowingContainer } from '../../components/follow/FollowingContainer';
import { Navigation } from '../../components/layouts/Navigation';
import { ToolBar } from '../../components/layouts/ToolBar';

const UserListFollowings: NextPage = () => {
  return (
    <>
      <Head>
        <title>팔로잉ㅣ낑깡팜</title>
      </Head>
      <ToolBar title="팔로잉" />
      <MainListFollowings>
        <FollowingContainer />
      </MainListFollowings>
      <Navigation />
    </>
  );
};

export default UserListFollowings;

const MainListFollowings = styled.main`
  margin: 49px 0 60px;
  padding: 0 16px;
`;
