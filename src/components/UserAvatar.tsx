// import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { GRAY_300 } from '../constants/colors';

type AvatarProps = {
  size: string;
  src: string;
};

export const UserAvatar = ({ size, src }: AvatarProps) => {
  return <ImgProfile size={size} src={src} alt="사용자 프로필 이미지" />;
};

const ImgProfile = styled.img<AvatarProps>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  background-color: ${(props) =>
    props.src !== '/default-profile-w.png' ? 'transparent' : GRAY_300};
`;
