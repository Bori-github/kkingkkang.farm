import styled from '@emotion/styled';
import router from 'next/router';
import { ReactNode } from 'react';
import { Z_INDEX, BORDER } from '../../constants';
import { WHITE, GRAY_900 } from '../../constants/colors';

export interface TooBarProps {
  title: string;
  children?: ReactNode;
}

export const ToolBar = ({ title, children }: TooBarProps) => {
  return (
    <Header>
      <BtnPrev type="button" onClick={() => router.back()}>
        <span className="sr-only">뒤로가기</span>
      </BtnPrev>
      <Title>{title}</Title>
      {children}
    </Header>
  );
};

const Header = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: ${Z_INDEX.header};
  padding: 12px 16px;
  border-bottom: ${BORDER.basic};
  background-color: ${WHITE};
  color: ${GRAY_900};
  font-size: 16px;
  font-weight: 700;
  line-height: 17px;
`;

const BtnPrev = styled.button`
  width: 24px;
  height: 24px;
  background: url('/icons/header/arrow-left.svg') no-repeat 50% 50%;
`;

const Title = styled.strong`
  flex: 1;
  padding-left: 8px;
`;
