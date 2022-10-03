import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactEventHandler, useEffect } from 'react';
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
  const accountname = Cookies.get('accountname');

  const { data, error } = useSWR(
    `${API_ENDPOINT}/post/${id}/userpost`,
    fetcher,
  );
  const { data: myData, error: myError } = useSWR(
    `${API_ENDPOINT}/post/${accountname}/userpost`,
    fetcher,
  );

  const handleImageOnError: ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.src = '/logo/logo-fail.png';
    e.currentTarget.className = 'onError';
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  if (!data || !myData) return <Loader height="100vh" />;
  if (error || myError) return <div>에러가 발생했습니다.</div>;

  // 팔로워의 게시글과 나의 게시글을 가져와 글 작성 순서로 정렬
  const chatData = [...data.post, ...myData.post].sort((a, b) =>
    new Date(a.createdAt).valueOf() > new Date(b.createdAt).valueOf() ? 1 : -1,
  );

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
          {chatData.map((postData: PostData) => {
            const { id, author, content, createdAt, image } = postData;
            const { image: authorImage, accountname: authorAccountname } =
              author;
            const imageList = image.split(',');
            const isMyChat = authorAccountname === accountname;

            return (
              <Message key={`chat-${id}`} isMyChat={isMyChat}>
                {!isMyChat && (
                  <UserAvatar
                    size={USER_AVATAR.sm.size}
                    src={authorImage || '/default-profile-w.png'}
                  />
                )}
                <div>
                  {content.length > 0 && (
                    <MsgBubble isMyChat={isMyChat}>
                      <span>{content}</span>
                    </MsgBubble>
                  )}
                  {imageList[0] !== '' && (
                    <ImgBubble column={imageList.length} isMyChat={isMyChat}>
                      {imageList.map((image) => {
                        return (
                          <Image
                            src={image}
                            alt="업로드 사진"
                            onError={handleImageOnError}
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

const Message = styled.div<{ isMyChat: boolean }>`
  display: flex;
  flex-direction: ${({ isMyChat }) => (isMyChat ? 'row-reverse' : 'row')};
  align-items: flex-start;
  gap: 8px;
  white-space: pre-wrap;
`;

const MsgBubble = styled.div<{ isMyChat: boolean }>`
  max-width: 220px;
  padding: 12px;
  border: ${BORDER.basic};
  border-radius: ${({ isMyChat }) =>
    isMyChat ? '10px 0 10px 10px' : '0 10px 10px 10px'};
  background-color: ${({ isMyChat }) => (isMyChat ? PRIMARY : WHITE)};
  color: ${({ isMyChat }) => (isMyChat ? WHITE : GRAY_900)};
  font-size: 14px;
  line-height: 1.3;
`;

const Timestamp = styled.span`
  align-self: flex-end;
  padding-bottom: 5px;
  font-size: 10px;
`;

const ImgBubble = styled.div<{ column: number; isMyChat: boolean }>`
  overflow: hidden;
  display: grid;
  grid-template-columns: ${({ column }) => `repeat(${column}, 1fr)`};
  width: 240px;
  margin-top: 4px;
  border-radius: 10px;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;

  &.onError {
    aspect-ratio: auto;
    object-fit: contain;
  }
`;
