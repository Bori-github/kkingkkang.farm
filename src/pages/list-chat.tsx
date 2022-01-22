import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { HeaderUserPage } from '../components/layouts/Header';
import { Navigation } from '../components/layouts/Navigation';
import { UserAvatar } from '../components/UserAvatar';
import { COLORS } from '../constants';

const ListChat: NextPage = () => {
  return (
    <>
      <Head>
        <title>채팅ㅣ낑깡팜</title>
      </Head>
      <HeaderUserPage />
      <MainListChat>
        <ListChats>
          <Link href="/" passHref>
            <LinkChat>
              <BoxUserAvatar>
                <UserAvatar size="36px" padding="6px" />
                <Badge className="unread">
                  <span className="sr-only">읽지 않은 채팅</span>
                </Badge>
              </BoxUserAvatar>
              <UserChat>
                <UserName>애월읍 위니브 감귤 농장</UserName>
                <UserText className="sl-ellipsis">
                  이번에 정정 언제하맨마씸?
                </UserText>
              </UserChat>
              <ChatTime>2020.10.25</ChatTime>
            </LinkChat>
          </Link>
          <Link href="/" passHref>
            <LinkChat>
              <BoxUserAvatar>
                <UserAvatar size="36px" padding="6px" />
                <Badge>
                  <span className="sr-only">읽지 않은 채팅</span>
                </Badge>
              </BoxUserAvatar>
              <UserChat>
                <UserName>제주감귤마을</UserName>
                <UserText className="sl-ellipsis">
                  안녕하세요. 감귤 사고싶어요요요요요
                </UserText>
              </UserChat>
              <ChatTime>2020.10.25</ChatTime>
            </LinkChat>
          </Link>
          <Link href="/" passHref>
            <LinkChat>
              <BoxUserAvatar>
                <UserAvatar size="36px" padding="6px" />
                <Badge>
                  <span className="sr-only">읽지 않은 채팅</span>
                </Badge>
              </BoxUserAvatar>
              <UserChat>
                <UserName>누구네 농장 친환경 한라봉</UserName>
                <UserText className="sl-ellipsis">
                  옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여,
                  어쩌구저쩌구 말이 많네요 뿐이다.
                </UserText>
              </UserChat>
              <ChatTime>2020.10.25</ChatTime>
            </LinkChat>
          </Link>
        </ListChats>
      </MainListChat>
      <Navigation />
    </>
  );
};

export default ListChat;

const MainListChat = styled.main`
  margin: 49px 0 60px;
  padding: 0 16px;
`;
const ListChats = styled.ul`
  display: grid;
  gap: 15px;
  padding: 20px 0;
`;
const LinkChat = styled.a`
  display: grid;
  grid-template-columns: 50px auto 56px;
  gap: 10px;
`;
const BoxUserAvatar = styled.div`
  position: relative;
`;
const Badge = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${COLORS.accent_green};

  &.unread {
    display: block;
  }
`;
const UserChat = styled.div`
  display: grid;
  font-size: 12px;
`;
const UserName = styled.span`
  align-self: center;
  color: ${COLORS.black};
  font-size: 14px;
`;
const UserText = styled.p`
  align-self: center;
`;
const ChatTime = styled.span`
  align-self: flex-end;
  padding-bottom: 5px;
  color: ${COLORS.light_gray};
  font-size: 10px;
`;
