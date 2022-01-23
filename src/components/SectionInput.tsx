import styled from '@emotion/styled';
import { BORDER, BUTTON, USER_AVATAR } from '../constants';
import { BtnImgUpload } from './BtnImgUpload';
import { UserAvatar } from './UserAvatar';

export const SectionInpReply = () => {
  return (
    <Contaioner>
      <h3 className="sr-only">댓글 입력</h3>
      <UserAvatar size={USER_AVATAR.sm.size} padding={USER_AVATAR.sm.padding} />
      <Form>
        <InpTxt type="text" placeholder="댓글 달기..." />
        <BtnSend type="button" className="active">
          게시
        </BtnSend>
      </Form>
    </Contaioner>
  );
};

export const SectionInpChat = () => {
  return (
    <Contaioner>
      <h3 className="sr-only">채팅 입력</h3>
      <BtnImgUpload />
      <Form>
        <InpTxt type="text" placeholder="메시지 입력하기" />
        <BtnSend type="button" className="active">
          전송
        </BtnSend>
      </Form>
    </Contaioner>
  );
};

const Contaioner = styled.article`
  display: grid;
  grid-template-columns: 42px auto;
  gap: 10px;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  padding: 5px;
  border-top: ${BORDER.basic};
  background-color: #fff;
`;
const Form = styled.form`
  display: grid;
  grid-template-columns: auto 50px;
  gap: 10px;
  align-items: center;
`;
const InpTxt = styled.input`
  padding: 5px 0;
  border: 0;
  background: none;
`;
const BtnSend = styled.button`
  padding: 5px;
  border-radius: 26px;
  background-color: ${BUTTON.disabled_color};
  color: #fff;

  &.active {
    background-color: ${BUTTON.background_color};
  }
`;
