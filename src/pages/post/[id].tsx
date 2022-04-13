import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import { Loader } from '../../components/common/Loader';
import { HeaderUserPage } from '../../components/layouts/Header';
import { PostCard } from '../../components/post/PostCard';
import { SectionInpReply } from '../../components/SectionInput';
import { SectionReplies } from '../../components/SectionReplies';
import { UserAvatar } from '../../components/UserAvatar';
import { API_ENDPOINT, USER_AVATAR } from '../../constants';
import { GRAY_900 } from '../../constants/colors';
import { fetcher } from '../../utils';

const Post: NextPage = () => {
  return (
    <>
      <Head>
        <title>유저 이름(유저 아이디)ㅣ낑깡팜</title>
      </Head>
      <HeaderUserPage headerTitle="게시물" />
      <MainPost>
        <PostCard />
        <SectionReplies />
        <SectionInpReply />
      </MainPost>
    </>
  );
};

export default Post;

const MainPost = styled.main`
  margin: 49px 0 53px;
`;
