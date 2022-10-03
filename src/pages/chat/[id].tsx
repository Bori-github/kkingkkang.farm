import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Loader } from '../../components/common/Loader';
import { ToolBar } from '../../components/layouts/ToolBar';
import { PopupExitChat } from '../../components/Popup';
import { SectionInpChat } from '../../components/SectionInput';
import { UserAvatar } from '../../components/UserAvatar';
import { API_ENDPOINT, BORDER, USER_AVATAR } from '../../constants';
import { GRAY_50, GRAY_900, PRIMARY, WHITE } from '../../constants/colors';
import { PostData } from '../../types';
import { dateFormatter, fetcher } from '../../utils';

const ChatPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    `${API_ENDPOINT}/post/${id}/userpost`,
    fetcher,
  );

  if (!data) return <Loader height="100vh" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  const { post } = data;
  const { username } = post[0].author;

  return (
    <>
      <Head>
        <title>{username}ㅣ낑깡팜</title>
      </Head>
      <ToolBar title={username}>
        <BtnMore type="button">
          <span className="sr-only">더 보기</span>
        </BtnMore>
      </ToolBar>
      <MainChat>
        <SectionChat>
          {post.map((postData: PostData) => {
            const { id, author, content, createdAt, image } = postData;
            const { image: authorImage } = author;
            const imageList = image.split(',');

            return (
              <Message key={`chat-${id}`}>
                <UserAvatar
                  size={USER_AVATAR.sm.size}
                  src={authorImage || '/default-profile-w.png'}
                />
                <div>
                  {content.length > 0 && (
                    <MsgBubble>
                      <span>{content}</span>
                    </MsgBubble>
                  )}
                  {imageList.length > 0 && (
                    <ImgBubble column={imageList.length}>
                      {imageList.map((image) => {
                        return (
                          <Image
                            src={image}
                            alt="업로드 사진"
                            key={`chat-image-${Math.random()}`}
                          />
                        );
                      })}
                    </ImgBubble>
                  )}
                </div>
                <Timestamp>{dateFormatter(createdAt)}</Timestamp>
              </Message>
            );
          })}

          {/* <Message className="own">
            <MsgBubble className="own">
              <span>네 말씀하세요.</span>
            </MsgBubble>
            <Timestamp>12:50</Timestamp>
          </Message>
          <ImgMessage className="own">
            <ImgBubble className="own">
              <img src="/example/chat-exapmle.png" alt="업로드 사진" />
            </ImgBubble>
            <Timestamp>12:51</Timestamp>
          </ImgMessage> */}
        </SectionChat>
        {/* <PopupExitChat /> */}
      </MainChat>
      <SectionInpChat />
    </>
  );
};

export default ChatPage;

const BtnMore = styled.button`
  width: 18px;
  height: 18px;
  background: url('/icons/header/more.svg') no-repeat;
  background-size: 100%;
`;

const MainChat = styled.main`
  min-height: calc(100vh - 100px);
  margin: 49px 0 51px;
  background-color: ${GRAY_50};
`;

const SectionChat = styled.section`
  display: grid;
  gap: 10px;
  padding: 10px;
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  &.own {
    flex-direction: row-reverse;
  }
`;

const MsgBubble = styled.div`
  max-width: 220px;
  padding: 12px;
  margin-bottom: 8px;
  border: ${BORDER.basic};
  border-radius: 0 10px 10px 10px;
  background-color: ${WHITE};
  color: ${GRAY_900};
  font-size: 14px;
  line-height: 1.3;

  &.own {
    margin: 0 0 0 5px;
    border-radius: 10px 0 10px 10px;
    background-color: ${PRIMARY};
    color: ${WHITE};
  }
`;

const Timestamp = styled.span`
  align-self: flex-end;
  padding-bottom: 5px;
  font-size: 10px;
`;

const ImgMessage = styled.div`
  display: flex;

  &.own {
    flex-direction: row-reverse;
  }
`;

const ImgBubble = styled.div<{ column: number }>`
  display: grid;
  grid-template-columns: ${({ column }) => `repeat(${column}, 1fr)`};
  width: 240px;

  &.own {
    margin: 0 0 0 5px;
  }
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  object-fit: cover;
`;
