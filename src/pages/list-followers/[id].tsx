import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { FollowerContainer } from '../../components/follow/FollowerContainer';
import { HeaderListFollowers } from '../../components/layouts/Header';
import { Navigation } from '../../components/layouts/Navigation';

const UserListFollowers: NextPage = () => {
  return (
    <>
      <Head>
        <title>팔로워ㅣ낑깡팜</title>
      </Head>
      <HeaderListFollowers />
      <MainListFollowers>
        <FollowerContainer />
      </MainListFollowers>
      <Navigation />
    </>
  );
};

export default UserListFollowers;

const MainListFollowers = styled.main`
  margin: 49px 0 60px;
  padding: 0 16px;
`;
