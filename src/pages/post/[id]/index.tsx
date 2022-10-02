import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Loader } from '../../../components/common/Loader';
import { ToolBar } from '../../../components/layouts/ToolBar';
import { PostCard } from '../../../components/post/PostCard';
import { SectionInputReply } from '../../../components/post/SectionInputReply';
import { SectionReplies } from '../../../components/post/SectionReplies';
import { API_ENDPOINT } from '../../../constants';
import { fetcher } from '../../../utils';

const Post: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `${API_ENDPOINT}/post/${id}` : null,
    fetcher,
  );

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  const { post } = data;
  const { id: postID, author } = post;
  const { accountname, username } = author;

  return (
    <>
      <Head>
        <title>
          {username}(@{accountname})ㅣ낑깡팜
        </title>
      </Head>
      <ToolBar title="게시글" />
      <MainPost>
        <PostCard postData={post} />
        <SectionReplies postData={{ id: postID }} />
        <SectionInputReply postData={{ id: postID }} />
      </MainPost>
    </>
  );
};

export default Post;

const MainPost = styled.main`
  margin: 49px 0 53px;
`;
