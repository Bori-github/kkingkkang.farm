import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { API_ENDPOINT, BORDER } from '../../constants';
import { CommentData } from '../../types';
import { fetcher } from '../../utils';
import { CommentCard } from './CommentCard';

interface SectionRepliesProps {
  postId: string;
}

export const SectionReplies = ({ postId }: SectionRepliesProps) => {
  const accountname = Cookies.get('accountname');
  const token = Cookies.get('token');
  const { data, error, mutate } = useSWR(
    postId ? `${API_ENDPOINT}/post/${postId}/comments/?limit=1000` : null,
    fetcher,
  );

  const [commentsList, setCommentsList] = useState<CommentData[]>([]);

  useEffect(() => {
    if (data) {
      setCommentsList(data.comments);
    }
  }, [data]);

  // 게시글 데이터가 없을 경우 Loader가 보이므로 댓글 영역에서 Loader가 중복으로 나타나지 않도록 처리
  if (!data) return <div />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <Container>
      <h2 className="sr-only">댓글 보기</h2>
      {commentsList.map((commentData: CommentData) => {
        const { id } = commentData;

        return (
          <CommentCard
            key={`comments-list-${id}`}
            postId={postId}
            commentData={commentData}
            accountname={accountname as string}
            token={token as string}
            mutate={mutate}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.section`
  padding: 20px 16px;
  border-top: ${BORDER.basic};
`;
