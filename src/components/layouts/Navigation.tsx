import styled from '@emotion/styled';
import Link from 'next/link';
import { BORDER } from '../../constants';

export const Navigation = () => {
  return (
    <Nav>
      <ListMenu>
        <ItemMenu className="item-home">
          <Link href="/home">
            <LinkMenu>
              <span>홈</span>
            </LinkMenu>
          </Link>
        </ItemMenu>
        <ItemMenu className="item-chat">
          <Link href="/chat">
            <LinkMenu>
              <span>채팅</span>
            </LinkMenu>
          </Link>
        </ItemMenu>
        <ItemMenu className="item-post">
          <Link href="/post">
            <LinkMenu>
              <span>게시물 작성</span>
            </LinkMenu>
          </Link>
        </ItemMenu>
        <ItemMenu className="item-profile">
          <Link href="/my-profile">
            <LinkMenu>
              <span>프로필</span>
            </LinkMenu>
          </Link>
        </ItemMenu>
      </ListMenu>
    </Nav>
  );
};

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
`;
const ItemMenu = styled.li`
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
`;
const LinkMenu = styled.a`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 85px;
  height: 54px;
  padding-bottom: 6px;
`;
