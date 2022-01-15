import styled from '@emotion/styled';
import Link from 'next/link';
import { BORDER } from '../../constants';

const Nav = styled.nav`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  border-top: ${BORDER.basic};
  background-color: #fff;
`;
const ListMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 10px;

  & li {
    background: no-repeat 50% 30%;
    &.item-home {
      background-image: url('/icons/nav/home.svg');
    }
    &.item-chat {
      background-image: url('/icons/nav/chat.svg');
    }
    &.item-post {
      background-image: url('/icons/nav/post.svg');
    }
    &.item-profile {
      background-image: url('/icons/nav/profile.svg');
    }

    &.item-home.active {
      background-image: url('/icons/nav/home-fill.svg');
    }
    &.item-chat.active {
      background-image: url('/icons/nav/chat-fill.svg');
    }
    &.item-profile.active {
      background-image: url('/icons/nav/profile-fill.svg');
    }
  }

  & .link-menu {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 85px;
    height: 54px;
    padding-bottom: 6px;
  }
`;

export const Navigation = () => {
  return (
    <Nav>
      <ListMenu>
        <li className="item-home">
          <Link href="/home">
            <a className="link-menu">
              <span>홈</span>
            </a>
          </Link>
        </li>
        <li className="item-chat">
          <Link href="/chat">
            <a className="link-menu">
              <span>채팅</span>
            </a>
          </Link>
        </li>
        <li className="item-post">
          <Link href="/post">
            <a className="link-menu">
              <span>게시물 작성</span>
            </a>
          </Link>
        </li>
        <li className="item-profile">
          <Link href="/my-profile">
            <a className="link-menu">
              <span>프로필</span>
            </a>
          </Link>
        </li>
      </ListMenu>
    </Nav>
  );
};
