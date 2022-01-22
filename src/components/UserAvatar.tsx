// import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { COLORS } from '../constants';

type AvatarProps = {
  size: string;
  padding: string;
};

export const UserAvatar = ({ size, padding }: AvatarProps) => {
  return (
    <ImgProfile
      size={size}
      padding={padding}
      src="/default-profile-w.png"
      alt="사용자 프로필 이미지"
    />
  );
};

const ImgProfile = styled.img<AvatarProps>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  padding: ${(props) => props.padding};
  border-radius: 50%;
  background-color: ${COLORS.light_gray};
`;
