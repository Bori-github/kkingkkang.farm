import styled from '@emotion/styled';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { API_ENDPOINT, BORDER, USER_AVATAR, Z_INDEX } from '../../constants';
import { GRAY_300, GRAY_900, PRIMARY, WHITE } from '../../constants/colors';
import { Comments } from '../../types/Comments';
import { dateFormatter, fetcher } from '../../utils';
import { Loader } from '../common/Loader';
import { UserAvatar } from '../UserAvatar';

interface RepliesProps {
  postData: {
    id: string;
  };
}

interface ModalProps {
  isShowModal: boolean;
}

export const SectionReplies = ({ postData }: RepliesProps) => {
  const { id: postID } = postData;
  const { data, error, mutate } = useSWR(
    postID ? `${API_ENDPOINT}/post/${postID}/comments/?limit=1000` : null,
    fetcher,
  );

  const [commentsList, setCommentsList] = useState([]);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const modalRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (data) {
      setCommentsList(data.comments);
    }
  });

  const handleCloseModal = (e: MouseEvent<HTMLElement>) => {
    modalRef.current.forEach((el) => {
      if (el === e.target) {
        setIsShowModal(false);
        setIsShowPopup(false);
      }
    });
  };

  const handleDeleteComment = async (commentID: string) => {
    const token = Cookies.get('token');
    const { data } = await axios(
      `${API_ENDPOINT}/post/${postID}/comments/${commentID}`,
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
      mutate();
    }
  };

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <Container>
      <h2 className="sr-only">댓글 보기</h2>
      {commentsList.map((commentsData: Comments) => {
        const { id, content, createdAt, author } = commentsData;
        const { username, image } = author;

        return (
          <>
            <UserReply key={`comments-list-${id}`}>
              <UserAvatar size={USER_AVATAR.xs.size} src={image} />
              <User>
                <UserName>{username}</UserName>
                <Timestamp>{dateFormatter(createdAt)}</Timestamp>
                <BtnMore type="button" onClick={() => setIsShowModal(true)}>
                  <span className="sr-only">더 보기</span>
                </BtnMore>
              </User>
              <TxtReply>{content}</TxtReply>
            </UserReply>
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
                      <ItemMore onClick={() => setIsShowPopup(true)}>
                        <button type="button">삭제</button>
                      </ItemMore>
                    </ul>
                  </ModalPopup>
                ) : (
                  <Popup>
                    <TxtLogout>댓글을 삭제할까요?</TxtLogout>
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
                        <BtnDelete
                          type="button"
                          onClick={() => handleDeleteComment(id)}
                        >
                          삭제
                        </BtnDelete>
                      </li>
                    </ListModalBtns>
                  </Popup>
                )}
              </BgPopup>
            )}
          </>
        );
      })}
    </Container>
  );
};

const Container = styled.section`
  padding: 20px 16px;
  border-top: ${BORDER.basic};
`;

const UserReply = styled.div`
  display: grid;
  grid-template-columns: 36px auto;
  column-gap: 10px;
  &:not(:first-of-type) {
    margin-top: 16px;
  }
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

const TxtReply = styled.p`
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
