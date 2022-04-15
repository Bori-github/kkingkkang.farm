import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { API_ENDPOINT, BORDER, USER_AVATAR } from '../../constants';
import { GRAY_900 } from '../../constants/colors';
import { Comments } from '../../types/Comments';
import { dateFormatter, fetcher } from '../../utils';
import { Loader } from '../common/Loader';
import { UserAvatar } from '../UserAvatar';

interface RepliesProps {
  postData: {
    id: string;
  };
}

export const SectionReplies = ({ postData }: RepliesProps) => {
  const { id: postID } = postData;
  const { data, error } = useSWR(
    postID ? `${API_ENDPOINT}/post/${postID}/comments/?limit=1000` : null,
    fetcher,
  );

  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    if (data) {
      setCommentsList(data.comments);
    }
  });

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <Container>
      <h2 className="sr-only">댓글 보기</h2>
      {commentsList.map((commentsData: Comments) => {
        const { id, content, createdAt, author } = commentsData;
        const { username, image } = author;

        return (
          <UserReply key={`comments-list-${id}`}>
            <UserAvatar size={USER_AVATAR.xs.size} src={image} />
            <User>
              <UserName>{username}</UserName>
              <Timestamp>{dateFormatter(createdAt)}</Timestamp>
              <BtnMore type="button">
                <span className="sr-only">더 보기</span>
              </BtnMore>
            </User>
            <TxtReply>{content}</TxtReply>
          </UserReply>
        );
      })}
    </Container>
  );
};

const Container = styled.section`
  padding: 20px 16px;
  border-top: ${BORDER.basic};
`;

const UserReply = styled.div`
  display: grid;
  grid-template-columns: 36px auto;
  column-gap: 10px;
  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;

const User = styled.div`
  position: relative;
  padding-top: 8px;
`;

const UserName = styled.span`
  color: ${GRAY_900};
  font-size: 14px;
`;

const Timestamp = styled.span`
  font-size: 10px;
  &::before {
    content: '·';
    margin: 0 10px;
  }
`;

const BtnMore = styled.button`
  position: absolute;
  top: 6px;
  right: 0;
  width: 18px;
  height: 18px;
  background: url('/icons/more-sm.svg') no-repeat;
  background-size: 100%;
`;

const TxtReply = styled.p`
  grid-column: 2 / 3;
  color: ${GRAY_900};
  font-size: 14px;
  line-height: 1.4;
`;
