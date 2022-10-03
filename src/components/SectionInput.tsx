import styled from '@emotion/styled';
import { BORDER, BUTTON, Z_INDEX } from '../constants';
import { GRAY_300, WHITE } from '../constants/colors';

export const SectionInpChat = () => {
  return (
    <Contaioner>
      <h3 className="sr-only">채팅 입력</h3>
      <div>
        <Label htmlFor="uploadImag">
          <span className="sr-only">사진 업로드</span>
        </Label>
        <input
          type="file"
          id="uploadImag"
          accept="image/*"
          className="sr-only"
        />
      </div>
      <Form>
        <InpTxt type="text" placeholder="메시지 입력하기" />
        <BtnSend type="button" disabled={true} />
      </Form>
    </Contaioner>
  );
};

const Contaioner = styled.article`
  display: grid;
  grid-template-columns: 36px auto;
  align-items: center;
  gap: 10px;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_INDEX.header};
  padding: 5px;
  border-top: ${BORDER.basic};
  background-color: ${WHITE};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: auto 40px;
  gap: 10px;
  align-items: center;
`;

const InpTxt = styled.input`
  padding: 5px 0;
  border: 0;
  background: none;
`;

const BtnSend = styled.button`
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 4px;
  background: url('/icons/post/send.svg') no-repeat 50% 50%;
  background-color: ${BUTTON.background_color};
  color: ${WHITE};

  &:disabled {
    background-color: ${BUTTON.disabled_color};
  }
`;

const Label = styled.label`
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: url('/icons/img/image.svg') no-repeat 50% 50% ${GRAY_300};
  cursor: pointer;
`;
