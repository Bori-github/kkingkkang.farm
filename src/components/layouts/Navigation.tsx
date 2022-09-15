import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BORDER, Z_INDEX } from '../../constants';
import { WHITE } from '../../constants/colors';

export const Navigation = () => {
  const router = useRouter();

  return (
    <Nav>
      <ListMenu>
        <li>
          <Link href="/home" passHref>
            <LinkMenu
              className={router.pathname === '/home' ? 'home active' : 'home'}
            >
              <span>홈</span>
            </LinkMenu>
          </Link>
        </li>
        <li>
          <Link href="/list-chat" passHref>
            <LinkMenu
              className={
                router.pathname === '/list-chat' ? 'chat active' : 'chat'
              }
            >
              <span>채팅</span>
            </LinkMenu>
          </Link>
        </li>
        <li>
          <Link href="/post" passHref>
            <LinkMenu
              className={router.pathname === '/post' ? 'post active' : 'post'}
            >
              <span>게시물 작성</span>
            </LinkMenu>
          </Link>
        </li>
        <li>
          <Link href="/user-page" passHref>
            <LinkMenu
              className={
                router.pathname === '/user-page'
                  ? 'user-page active'
                  : 'user-page'
              }
            >
              <span>프로필</span>
            </LinkMenu>
          </Link>
        </li>
      </ListMenu>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_INDEX.header};
  border-top: ${BORDER.basic};
  background-color: ${WHITE};
`;

const ListMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 10px;
`;

const LinkMenu = styled.a`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 85px;
  height: 54px;
  padding-bottom: 6px;
  background: no-repeat 50% 30%;

  &.home {
    background-image: url('/icons/nav/home.svg');
  }
  &.chat {
    background-image: url('/icons/nav/chat.svg');
  }
  &.post {
    background-image: url('/icons/nav/post.svg');
  }
  &.user-page {
    background-image: url('/icons/nav/profile.svg');
  }

  &.home.active {
    background-image: url('/icons/nav/home-fill.svg');
  }
  &.chat.active {
    background-image: url('/icons/nav/chat-fill.svg');
  }
  &.user-page.active {
    background-image: url('/icons/nav/profile-fill.svg');
  }
`;
