import styled from '@emotion/styled';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { MouseEvent, useRef, useState } from 'react';
import { API_ENDPOINT, BORDER, USER_AVATAR, Z_INDEX } from '../../constants';
import { GRAY_300, GRAY_900, PRIMARY, WHITE } from '../../constants/colors';
import { dateFormatter } from '../../utils';
import { UserAvatar } from '../UserAvatar';
import { ImgCarousel } from './ImgCarousel';

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

interface ModalProps {
  isShowModal: boolean;
}

export const FeedCard = ({ postData }: PostProps) => {
  const router = useRouter();
  const accountname = Cookies.get('accountname');
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
  const {
    accountname: authorAccountname,
    username,
    image: profileImg,
  } = author;
  const postImgList = image && image.split(',');

  const [liked, setLiked] = useState(hearted);
  const [likeCount, setLikeCount] = useState(heartCount);

  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const modalRef = useRef<(HTMLElement | null)[]>([]);

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

  const handleCloseModal = (e: MouseEvent<HTMLElement>) => {
    modalRef.current.forEach((el) => {
      if (el === e.target) {
        setIsShowModal(false);
        setIsShowPopup(false);
      }
    });
  };

  const handleDeletePost = async () => {
    const { data } = await axios(`${API_ENDPOINT}/post/${postID}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    if (data.message === '삭제되었습니다.') {
      setIsShowModal(false);
      setIsShowPopup(false);
      // router.push('/user-page');
    }
  };

  const handleReportPost = async () => {
    const { data } = await axios(`${API_ENDPOINT}/post/${postID}/report`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    if (data.report.post === postID) {
      setIsShowModal(false);
      setIsShowPopup(false);
      alert('해당 게시글은 신고 처리 되었습니다.');
    }
  };

  return (
    <>
      <Feed>
        <BoxProfileImg>
          <UserAvatar size={USER_AVATAR.sm.size} src={profileImg} />
        </BoxProfileImg>
        <HeaderArticle>
          <UserName>{username}</UserName>
          <UserId>@{authorAccountname}</UserId>
          <BtnMore type="button" onClick={() => setIsShowModal(true)}>
            <span className="sr-only">더 보기</span>
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
              <BtnReply
                type="button"
                onClick={() => router.push(`/post/${postID}`)}
              >
                <span className="sr-only">댓글</span>
              </BtnReply>
              <span>{commentCount}</span>
            </ItemIcon>
          </ListIcons>
          <TxtCreateAt>{dateFormatter(createdAt)}</TxtCreateAt>
        </div>
      </Feed>
      {isShowModal && (
        <BgPopup
          ref={(el) => {
            modalRef.current[0] = el;
          }}
          onClick={handleCloseModal}
        >
          {!isShowPopup ? (
            <ModalPopup isShowModal={isShowModal}>
              <ul>
                {authorAccountname === accountname ? (
                  <>
                    <ItemMore>
                      <button
                        type="button"
                        onClick={() => setIsShowPopup(true)}
                      >
                        삭제
                      </button>
                    </ItemMore>
                    <ItemMore>
                      <button type="button">수정</button>
                    </ItemMore>
                  </>
                ) : (
                  <ItemMore>
                    <button type="button" onClick={() => setIsShowPopup(true)}>
                      신고하기
                    </button>
                  </ItemMore>
                )}
              </ul>
            </ModalPopup>
          ) : (
            <Popup>
              {authorAccountname === accountname ? (
                <TxtLogout>게시글을 삭제할까요?</TxtLogout>
              ) : (
                <TxtLogout>게시글을 신고할까요?</TxtLogout>
              )}
              <ListModalBtns>
                <li>
                  <BtnCancel
                    type="button"
                    ref={(el) => {
                      modalRef.current[1] = el;
                    }}
                    onClick={handleCloseModal}
                  >
                    취소
                  </BtnCancel>
                </li>
                <li>
                  {authorAccountname === accountname ? (
                    <BtnDelete type="button" onClick={handleDeletePost}>
                      삭제
                    </BtnDelete>
                  ) : (
                    <BtnDelete type="button" onClick={handleReportPost}>
                      신고
                    </BtnDelete>
                  )}
                </li>
              </ListModalBtns>
            </Popup>
          )}
        </BgPopup>
      )}
    </>
  );
};

const Feed = styled.article`
  display: grid;
  grid-template-columns: 42px auto;
  grid-template-rows: 42px auto;
  gap: 10px;
  margin: 20px 0;
  padding: 0 16px;
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

const BgPopup = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_INDEX.popup};
  background-color: rgba(0, 0, 0, 0.5);
  color: ${GRAY_900};
`;

const ModalPopup = styled.div<ModalProps>`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 36px 0 10px;
  border-radius: 20px 20px 0 0;
  background-color: ${WHITE};
  transform: ${(isShowModal) =>
    isShowModal ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.1s;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    top: 16px;
    left: 50%;
    width: 50px;
    height: 4px;
    border-radius: 4px;
    background-color: ${GRAY_300};
    transform: translateX(-50%);
  }
`;

const ItemMore = styled.li`
  padding: 14px 25px;
  font-size: 14px;
`;

const Popup = styled.div`
  position: absolute;
  top: calc(50% - 30px);
  left: 50%;
  border-radius: 10px;
  background-color: ${WHITE};
  text-align: center;
  transform: translate(-50%, -50%);
`;

const TxtLogout = styled.p`
  padding: 20px 0;
  border-bottom: ${BORDER.basic};
`;

const ListModalBtns = styled.ul`
  display: flex;
  font-size: 14px;
`;

const BtnCancel = styled.button`
  position: relative;
  width: 126px;
  padding: 15px 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    background-color: ${GRAY_300};
  }
`;

const BtnDelete = styled.button`
  width: 126px;
  padding: 15px 0;
  color: ${PRIMARY};
`;
