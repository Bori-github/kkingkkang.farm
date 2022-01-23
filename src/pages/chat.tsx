import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { HeaderChat } from '../components/layouts/Header';
import { PopupExitChat } from '../components/Popup';
import { SectionInpChat } from '../components/SectionInput';
import { UserAvatar } from '../components/UserAvatar';
import { COLORS, USER_AVATAR } from '../constants';

const Chat: NextPage = () => {
  return (
    <>
      <Head>
        <title>채팅 유저 이름ㅣ낑깡팜</title>
      </Head>
      <HeaderChat />
      <MainChat>
        <SectionChat>
          <Message>
            <UserAvatar
              size={USER_AVATAR.sm.size}
              padding={USER_AVATAR.sm.padding}
            />
            <MsgBubble>
              <span>
                옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여,
                뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할
                넣는 풍부하게 뛰노는 인생의 힘있다.
              </span>
            </MsgBubble>
            <Timestamp>12:39</Timestamp>
          </Message>
          <Message>
            <UserAvatar
              size={USER_AVATAR.sm.size}
              padding={USER_AVATAR.sm.padding}
            />
            <MsgBubble>
              <span>안녕하세요. 감귤 사고싶어요요요요요</span>
            </MsgBubble>
            <Timestamp>12:49</Timestamp>
          </Message>

          <Message className="own">
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
          </ImgMessage>
        </SectionChat>
        {/* <PopupExitChat /> */}
      </MainChat>
      <SectionInpChat />
    </>
  );
};

export default Chat;

const MainChat = styled.main`
  min-height: calc(100vh - 100px);
  margin: 49px 0 51px;
  background-color: ${COLORS.light_gray};
`;
const SectionChat = styled.section`
  display: grid;
  gap: 10px;
  padding: 10px;
`;
const Message = styled.div`
  display: flex;
  align-items: flex-start;

  &.own {
    flex-direction: row-reverse;
  }
`;
const MsgBubble = styled.div`
  max-width: 220px;
  margin: 0 5px 0 8px;
  padding: 12px;
  border-radius: 0 10px 10px 10px;
  background-color: #fff;
  color: ${COLORS.black};
  font-size: 14px;
  line-height: 1.3;

  &.own {
    margin: 0 0 0 5px;
    border-radius: 10px 0 10px 10px;
    background-color: ${COLORS.accent_green};
    color: #fff;
  }
`;
const Timestamp = styled.span`
  align-self: flex-end;
  font-size: 10px;
`;
const ImgMessage = styled.div`
  display: flex;
  &.own {
    flex-direction: row-reverse;
  }
`;
const ImgBubble = styled.div`
  overflow: hidden;
  width: 240px;
  height: 240px;
  margin-right: 5px;
  border-radius: 10px;
  &.own {
    margin: 0 0 0 5px;
  }
`;
