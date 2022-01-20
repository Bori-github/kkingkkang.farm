import styled from '@emotion/styled';
import { BORDER, BUTTON, COLORS } from '../constants';

export const Reply = () => {
  return (
    <ContReply>
      <h3 className="sr-only">댓글 입력</h3>
      <div>
        <ImgUser src="/default-profile-w.png" alt="사용자 프로필 이미지" />
      </div>
      <FormPost>
        <InpReply type="text" placeholder="댓글 달기..." />
        <BtnPost type="button" className="active">
          게시
        </BtnPost>
      </FormPost>
    </ContReply>
  );
};

const ContReply = styled.article`
  display: grid;
  grid-template-columns: 50px auto;
  gap: 10px;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  border-top: ${BORDER.basic};
  background-color: #fff;
`;
const ImgUser = styled.img`
  width: 30px;
  margin: 5px;
  padding: 5px;
  border-radius: 50%;
  background-color: ${COLORS.light_gray};
`;
const FormPost = styled.form`
  display: grid;
  grid-template-columns: auto 50px;
  align-items: center;
`;
const InpReply = styled.input`
  padding: 5px 0;
  border: 0;
  background: none;
`;
const BtnPost = styled.button`
  margin: 5px;
  padding: 5px;
  border-radius: 26px;
  background-color: ${BUTTON.disabled_color};
  color: #fff;

  &.active {
    background-color: ${BUTTON.background_color};
  }
`;
