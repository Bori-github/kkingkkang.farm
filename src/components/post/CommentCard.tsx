import styled from '@emotion/styled';
import axios from 'axios';
import { useState, useRef, MouseEventHandler } from 'react';
import { USER_AVATAR, Z_INDEX, BORDER, API_ENDPOINT } from '../../constants';
import { GRAY_900, WHITE, GRAY_300, PRIMARY } from '../../constants/colors';
import { CommentData } from '../../types';
import { dateFormatter } from '../../utils';
import { UserAvatar } from '../UserAvatar';

interface CommentCardProps {
  commentData: CommentData;
  postId: string;
  accountname: string;
  token: string;
  mutate: () => void;
}

interface ModalProps {
  isShowModal: boolean;
}

export const CommentCard = ({
  postId,
  commentData,
  accountname,
  token,
  mutate,
}: CommentCardProps) => {
  const { id, content, createdAt, author } = commentData;
  const { username, image, accountname: authorAccountname } = author;

  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const modalRef = useRef<(HTMLElement | null)[]>([]);

  const handleCloseModal: MouseEventHandler<HTMLElement> = (e) => {
    modalRef.current.forEach((el) => {
      if (el === e.target) {
        setIsShowModal(false);
        setIsShowPopup(false);
      }
    });
  };

  const handleDeleteComment = async (commentId: string) => {
    const { data } = await axios(
      `${API_ENDPOINT}/post/${postId}/comments/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );

    if (data.message === '댓글이 삭제되었습니다.') {
      setIsShowPopup(false);
      setIsShowModal(false);
      mutate();
    }
  };

  const handleReportComment = async (commentId: string) => {
    const { data } = await axios(
      `${API_ENDPOINT}/post/${postId}/comments/${commentId}/report`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );

    if (data.report.comment === commentId) {
      setIsShowModal(false);
      setIsShowPopup(false);
      alert('해당 댓글은 신고 처리 되었습니다.');
    }
  };

  return (
    <Container>
      <CommentBox>
        <UserAvatar
          size={USER_AVATAR.xs.size}
          src={image}
          accountName={authorAccountname}
        />
        <User>
          <UserName>{username}</UserName>
          <Timestamp>{dateFormatter(createdAt)}</Timestamp>
          <BtnMore type="button" onClick={() => setIsShowModal(true)}>
            <span className="sr-only">더 보기</span>
          </BtnMore>
        </User>
        <CommentContent>{content}</CommentContent>
      </CommentBox>
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
                  <ItemMore onClick={() => setIsShowPopup(true)}>
                    <button type="button">삭제</button>
                  </ItemMore>
                ) : (
                  <ItemMore onClick={() => setIsShowPopup(true)}>
                    <button type="button">신고하기</button>
                  </ItemMore>
                )}
              </ul>
            </ModalPopup>
          ) : (
            <Popup>
              {authorAccountname === accountname ? (
                <TxtLogout>댓글을 삭제할까요?</TxtLogout>
              ) : (
                <TxtLogout>댓글을 신고할까요?</TxtLogout>
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
                    <BtnDelete
                      type="button"
                      onClick={() => handleDeleteComment(id)}
                    >
                      삭제
                    </BtnDelete>
                  ) : (
                    <BtnDelete
                      type="button"
                      onClick={() => handleReportComment(id)}
                    >
                      신고
                    </BtnDelete>
                  )}
                </li>
              </ListModalBtns>
            </Popup>
          )}
        </BgPopup>
      )}
    </Container>
  );
};

const Container = styled.div`
  & + & {
    margin-top: 16px;
  }
`;

const CommentBox = styled.div`
  display: grid;
  grid-template-columns: 36px auto;
  column-gap: 10px;
`;

const User = styled.div`
  position: relative;
  padding-top: 8px;
`;

const UserName = styled.span`
  color: ${GRAY_900};
  font-size: 14px;
`;

const Timestamp = styled.span`
  font-size: 10px;
  &::before {
    content: '·';
    margin: 0 10px;
  }
`;

const BtnMore = styled.button`
  position: absolute;
  top: 6px;
  right: 0;
  width: 18px;
  height: 18px;
  background: url('/icons/more-sm.svg') no-repeat;
  background-size: 100%;
`;

const CommentContent = styled.p`
  grid-column: 2 / 3;
  color: ${GRAY_900};
  font-size: 14px;
  line-height: 1.4;
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
