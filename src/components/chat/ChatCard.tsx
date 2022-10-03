import styled from '@emotion/styled';
import Link from 'next/link';
import useSWR from 'swr';
import { API_ENDPOINT, USER_AVATAR } from '../../constants';
import { PRIMARY, GRAY_900, GRAY_400 } from '../../constants/colors';
import { UserData } from '../../types/UserData';
import { chatDateFormatter, fetcher } from '../../utils';
import { Loader } from '../common/Loader';
import { UserAvatar } from '../UserAvatar';

interface ChatCardProps {
  followerData: UserData;
}

export const ChatCard = ({ followerData }: ChatCardProps) => {
  const { image, username, accountname } = followerData;
  const { data, error } = useSWR(
    accountname ? `${API_ENDPOINT}/post/${accountname}/userpost` : null,
    fetcher,
  );

  if (!data) return <Loader height="100vh" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  const { post } = data;

  return (
    <li>
      <Link href={`/chat/${accountname}`} passHref>
        <ChatAnchor href="replace">
          <UserBox>
            <UserAvatar
              size={USER_AVATAR.sm.size}
              src={
                image.startsWith('https://') ? image : '/default-profile-w.png'
              }
            />
            {post.length > 0 && (
              <Badge>
                <span className="sr-only">읽지 않은 채팅</span>
              </Badge>
            )}
          </UserBox>
          <ChatContainer>
            <UserName>{username}</UserName>
            <ChatMessage className="sl-ellipsis">
              {post.length > 0 ? post[0].content : '...'}
            </ChatMessage>
          </ChatContainer>
          <ChatTime>
            {post.length > 0 ? chatDateFormatter(post[0].createdAt) : ''}
          </ChatTime>
        </ChatAnchor>
      </Link>
    </li>
  );
};

const ChatAnchor = styled.a`
  display: grid;
  grid-template-columns: 42px auto 60px;
  gap: 10px;
`;

const UserBox = styled.div`
  position: relative;
`;

const Badge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${PRIMARY};
`;

const ChatContainer = styled.div`
  display: grid;
  font-size: 12px;
`;

const UserName = styled.span`
  align-self: center;
  color: ${GRAY_900};
  font-size: 14px;
`;

const ChatMessage = styled.p`
  align-self: center;
`;

const ChatTime = styled.span`
  align-self: flex-end;
  padding-bottom: 5px;
  color: ${GRAY_400};
  font-size: 10px;
  text-align: right;
`;
