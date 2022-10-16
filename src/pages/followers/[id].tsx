import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { FollowerContainer } from '../../components/follow/FollowerContainer';
import { Navigation } from '../../components/layouts/Navigation';
import { ToolBar } from '../../components/layouts/ToolBar';

const UserListFollowers: NextPage = () => {
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
