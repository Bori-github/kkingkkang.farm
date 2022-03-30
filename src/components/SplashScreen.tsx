import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { WHITE } from '../constants/colors';

export const SplashScreen = () => {
  return <SplashScreenStyle />;
};

const splash = keyframes`
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const SplashScreenStyle = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: url('/logo/logo-kkingkkang.png') no-repeat 50% 50% ${WHITE};
  animation: ${splash} 0.5s ease-in-out 0.5s forwards;
`;
