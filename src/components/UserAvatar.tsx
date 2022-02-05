// import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { COLORS } from '../constants';

type AvatarProps = {
  size: string;
};

export const UserAvatar = ({ size }: AvatarProps) => {
  return (
    <ImgProfile
      size={size}
      src="/default-profile-w.png"
      alt="사용자 프로필 이미지"
    />
  );
};

const ImgProfile = styled.img<AvatarProps>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  background-color: ${COLORS.light_gray};
`;
