import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BUTTON } from '../constants';

export const BtnImgUpload = () => {
  return (
    <BtnUpload type="button">
      <span className="sr-only">사진 업로드 버튼</span>
    </BtnUpload>
  );
};

const btnStyle = () => css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: url('/icons/img/image.svg') no-repeat 50% 50%
    ${BUTTON.background_color};
`;

const BtnUpload = styled.button`
  ${btnStyle}
`;
