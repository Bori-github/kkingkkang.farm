import styled from '@emotion/styled';
import Link from 'next/link';
import { BORDER, COLORS } from '../constants';

export const PopupMoreUser = () => {
  return (
    <BgPopup>
      <ModalPopup>
        <ul>
          <ItemMore>
            <Link href="/">
              <a>설정 및 개인정보</a>
            </Link>
          </ItemMore>
          <ItemMore>
            <button type="button">로그아웃</button>
          </ItemMore>
        </ul>
      </ModalPopup>
    </BgPopup>
  );
};

export const PopupLogout = () => {
  return (
    <BgPopup>
      <Popup>
        <TxtLogout>로그아웃 할까요?</TxtLogout>
        <ListLogoutBtns>
          <li>
            <BtnCancel type="button">취소</BtnCancel>
          </li>
          <li>
            <Link href="/" passHref>
              <BtnLogout>로그아웃</BtnLogout>
            </Link>
          </li>
        </ListLogoutBtns>
      </Popup>
    </BgPopup>
  );
};

export const PopupProduct = () => {
  return (
    <BgPopup>
      <ModalPopup>
        <ul>
          <ItemMore>
            <button type="button">삭제</button>
          </ItemMore>
          <ItemMore>
            <button type="button">수정</button>
          </ItemMore>
          <ItemMore>
            <Link href="/">
              <a>웹사이트에서 상품 보기</a>
            </Link>
          </ItemMore>
        </ul>
      </ModalPopup>
    </BgPopup>
  );
};

export const PopupProducDelete = () => {
  return (
    <BgPopup>
      <Popup>
        <TxtLogout>상품을 삭제할까요?</TxtLogout>
        <ListLogoutBtns>
          <li>
            <BtnCancel type="button">취소</BtnCancel>
          </li>
          <li>
            <Link href="/" passHref>
              <BtnLogout>삭제</BtnLogout>
            </Link>
          </li>
        </ListLogoutBtns>
      </Popup>
    </BgPopup>
  );
};

export const PopupPost = () => {
  return (
    <BgPopup>
      <ModalPopup>
        <ul>
          <ItemMore>
            <button type="button">삭제</button>
          </ItemMore>
          <ItemMore>
            <button type="button">수정</button>
          </ItemMore>
        </ul>
      </ModalPopup>
    </BgPopup>
  );
};

export const PopupPostDelete = () => {
  return (
    <BgPopup>
      <Popup>
        <TxtLogout>게시글을 삭제할까요?</TxtLogout>
        <ListLogoutBtns>
          <li>
            <BtnCancel type="button">취소</BtnCancel>
          </li>
          <li>
            <Link href="/" passHref>
              <BtnLogout>삭제</BtnLogout>
            </Link>
          </li>
        </ListLogoutBtns>
      </Popup>
    </BgPopup>
  );
};

export const PopupExitChat = () => {
  return (
    <BgPopup>
      <ModalPopup className="exit">
        <BtnExit type="button">채팅방 나가기</BtnExit>
      </ModalPopup>
    </BgPopup>
  );
};
const BgPopup = styled.div`
  /* display: none; */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${COLORS.black};
`;
const ModalPopup = styled.div`
  position: fixed;
  right: 0;
  bottom: 60px;
  left: 0;
  padding: 36px 0 10px;
  border-radius: 20px 20px 0 0;
  background-color: #fff;

  &::before {
    content: '';
    position: absolute;
    top: 16px;
    left: 50%;
    width: 50px;
    height: 4px;
    border-radius: 4px;
    background-color: #dbdbdb;
    transform: translateX(-50%);
  }

  &.exit {
    bottom: 51px;
  }
`;
const ItemMore = styled.li`
  padding: 14px 25px;
  font-size: 14px;
`;

const Popup = styled.div`
  position: absolute;
  top: calc(50% - 30px);
  left: 50%;
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
  transform: translate(-50%, -50%);
`;
const TxtLogout = styled.p`
  padding: 20px 0;
  border-bottom: ${BORDER.basic};
`;
const ListLogoutBtns = styled.ul`
  display: flex;
  font-size: 14px;
`;
const BtnCancel = styled.button`
  position: relative;
  width: 126px;
  padding: 15px 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    background-color: ${COLORS.light_gray};
  }
`;
const BtnLogout = styled.a`
  display: block;
  width: 126px;
  line-height: 46px;
  color: ${COLORS.accent_green};
`;
const BtnExit = styled.button`
  width: 100%;
  padding: 14px 25px;
  font-size: 14px;
  text-align: left;
`;
