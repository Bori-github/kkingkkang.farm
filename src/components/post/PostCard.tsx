import styled from '@emotion/styled';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { API_ENDPOINT, USER_AVATAR } from '../../constants';
import { GRAY_900 } from '../../constants/colors';
import { dateFormatter } from '../../utils';
import { ImgCarousel } from '../feed/ImgCarousel';
import { UserAvatar } from '../UserAvatar';

interface PostProps {
  postData: {
    id: string;
    content: string;
    image: string;
    createdAt: string;
    hearted: boolean;
    heartCount: number;
    commentCount: number;
    author: {
      username: string;
      accountname: string;
      image: string;
    };
  };
}

interface FeedCardProps {
  liked: boolean;
}

export const PostCard = ({ postData }: PostProps) => {
  const token = Cookies.get('token');

  const {
    id: postID,
    content,
    image,
    createdAt,
    hearted,
    heartCount,
    commentCount,
    author,
  } = postData;
  const { accountname, username, image: profileImg } = author;

  const [liked, setLiked] = useState(hearted);
  const [likeCount, setLikeCount] = useState(heartCount);

  const handleBtnLike = async () => {
    if (liked) {
      await axios(`${API_ENDPOINT}/post/${postID}/unheart`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });

      setLikeCount((state) => state - 1);
    } else {
      await axios(`${API_ENDPOINT}/post/${postID}/heart`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      });

      setLikeCount((state) => state + 1);
    }

    setLiked(!liked);
  };
  const postImgList = image && image.split(',');

  return (
    <Feed>
      <h2 className="sr-only">피드 보기</h2>
      <BoxProfileImg>
        <UserAvatar size={USER_AVATAR.sm.size} src={profileImg} />
      </BoxProfileImg>
      <HeaderArticle>
        <UserName>{username}</UserName>
        <UserId>@{accountname}</UserId>
        <BtnMore type="button">
          <span className="sr-only">옵션 더 보기</span>
        </BtnMore>
      </HeaderArticle>
      <div>
        <TxtFeed>{content}</TxtFeed>
        {postImgList && postImgList[0] !== '' && (
          <ImgCarousel imgList={postImgList} />
        )}
        <ListIcons>
          <ItemIcon>
            <BtnLike type="button" liked={liked} onClick={handleBtnLike}>
              <span className="sr-only">좋아요</span>
            </BtnLike>
            <span>{likeCount}</span>
          </ItemIcon>
          <ItemIcon>
            <BtnReply type="button">
              <span className="sr-only">댓글</span>
            </BtnReply>
            <span>{commentCount}</span>
          </ItemIcon>
        </ListIcons>
        <TxtCreateAt>{dateFormatter(createdAt)}</TxtCreateAt>
      </div>
    </Feed>
  );
};

const Feed = styled.section`
  display: grid;
  grid-template-columns: 42px auto;
  grid-template-rows: 42px auto;
  gap: 10px;
  padding: 20px;
`;

const BoxProfileImg = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
`;

const HeaderArticle = styled.header`
  grid-column: 2 / 3;
  display: grid;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 4px 0;
`;

const UserName = styled.span`
  grid-column: 1 / 2;
  color: ${GRAY_900};
  font-size: 14px;
  font-weight: 700;
`;

const UserId = styled.span`
  grid-column: 1 / 2;
  font-size: 12px;
`;

const BtnMore = styled.button`
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  align-self: flex-start;
  width: 18px;
  height: 18px;
  background: url('/icons/header/more.svg') no-repeat;
  background-size: 100%;
`;

const TxtCreateAt = styled.span`
  font-size: 10px;
`;

const TxtFeed = styled.p`
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 1.4;
`;

const ListIcons = styled.ul`
  display: flex;
  margin: 10px 0;
  font-size: 12px;
`;

const ItemIcon = styled.li`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

const BtnLike = styled.button<FeedCardProps>`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background: ${({ liked }) =>
    liked
      ? `url('/icons/heart-fill.svg') no-repeat`
      : `url('/icons/heart.svg') no-repeat`};
  background-size: 100%;
`;

const BtnReply = styled.button`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background: url('/icons/message-sm.svg') no-repeat;
  background-size: 100%;
`;
