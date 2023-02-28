import styled from '@emotion/styled';
import Link from 'next/link';
import { GRAY_300 } from '../constants/colors';

interface StyleProps {
  size: string;
  src: string;
}

interface UserAvatarProps extends StyleProps {
  accountName?: string;
}

export const UserAvatar = ({ size, src, accountName }: UserAvatarProps) => {
  if (accountName) {
    return (
      <Link href={`/profile/${accountName}`} passHref>
        <a>
          <ImgProfile size={size} src={src} alt="사용자 프로필 이미지" />
        </a>
      </Link>
    );
  }
  return <ImgProfile size={size} src={src} alt="사용자 프로필 이미지" />;
};

const ImgProfile = styled.img<StyleProps>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  background-color: ${(props) =>
    props.src !== '/default-profile-w.png' ? 'transparent' : GRAY_300};
`;
