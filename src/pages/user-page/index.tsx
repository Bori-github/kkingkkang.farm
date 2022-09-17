import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { MouseEvent, useCallback, useRef, useState } from 'react';
import useSWR from 'swr';
import { Loader } from '../../components/common/Loader';
import { Navigation } from '../../components/layouts/Navigation';
import { ToolBar } from '../../components/layouts/ToolBar';
import {
  PopupMoreUser,
  PopupPost,
  PopupPostDelete,
  PopupProducDelete,
  PopupProduct,
} from '../../components/Popup';
import { SectionFeed } from '../../components/SectionFeed';
import { SectionProducts } from '../../components/SectionProducts';
import { SectionMyInfo } from '../../components/SectionUserInfo';
import { API_ENDPOINT, BORDER, Z_INDEX } from '../../constants';
import { GRAY_900, WHITE, GRAY_300, PRIMARY } from '../../constants/colors';
import { fetcher } from '../../utils';

interface ModalProps {
  isShowModal: boolean;
}

const UserPage: NextPage = () => {
  const accountname = Cookies.get('accountname') || '';

  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const modalRef = useRef<(HTMLElement | null)[]>([]);

  const handleModal = useCallback(() => {
    setIsShowModal(!isShowModal);
  }, [isShowModal]);

  const { data, error } = useSWR(
    `${API_ENDPOINT}/profile/${accountname}`,
    fetcher,
  );

  const handleCloseModal = (e: MouseEvent<HTMLElement>) => {
    modalRef.current.forEach((el) => {
      if (el === e.target) {
        setIsShowModal(false);
        setIsShowPopup(false);
      }
    });
  };

  const handleLogout = () => {
    Cookies.remove('accountname');
    Cookies.remove('token');
    router.push('/');
  };

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  const { followerCount, followingCount, image, intro, username, isfollow } =
    data.profile;

  return (
    <>
      <Head>
        <title>
          {username}({accountname})ㅣ낑깡팜
        </title>
      </Head>
      <ToolBar title={username}>
        <BtnMore type="button" onClick={handleModal}>
          <span className="sr-only">옵션 더 보기</span>
        </BtnMore>
      </ToolBar>
      <MainMyPage>
        <SectionMyInfo
          userInfoData={{
            accountname,
            followerCount,
            followingCount,
            image,
            intro,
            username,
            isfollow,
          }}
        />
        {/* <SectionProducts /> */}
        <SectionFeed />
      </MainMyPage>
      {/* <PopupPost />
      <PopupPostDelete />
      <PopupProduct />
      <PopupProducDelete /> */}
      <Navigation />
      {isShowModal && (
        <ModalContainer>
          <BgPopup
            ref={(el) => {
              modalRef.current[0] = el;
            }}
            onClick={handleCloseModal}
            isShowModal={isShowModal}
          />
          {!isShowPopup ? (
            <ModalPopup isShowModal={isShowModal}>
              <ul>
                <ItemMore>
                  <button
                    type="button"
                    onClick={() => router.push('/edit-profile')}
                  >
                    프로필 수정
                  </button>
                </ItemMore>
                <ItemMore>
                  <button type="button" onClick={() => setIsShowPopup(true)}>
                    로그아웃
                  </button>
                </ItemMore>
              </ul>
            </ModalPopup>
          ) : (
            <Popup>
              <TxtLogout>로그아웃 할까요?</TxtLogout>
              <ListLogoutBtns>
                <li>
                  <BtnCancel
                    ref={(el) => {
                      modalRef.current[1] = el;
                    }}
                    type="button"
                    onClick={handleCloseModal}
                  >
                    취소
                  </BtnCancel>
                </li>
                <li>
                  <BtnLogout type="button" onClick={handleLogout}>
                    로그아웃
                  </BtnLogout>
                </li>
              </ListLogoutBtns>
            </Popup>
          )}
        </ModalContainer>
      )}
    </>
  );
};

export default UserPage;

const MainMyPage = styled.main`
  min-height: calc(100vh - 109px);
  margin: 49px 0 60px;
  background-color: #f2f2f2;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_INDEX.popup};
`;

const BgPopup = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${GRAY_900};
  transform: ${(isShowModal) =>
    isShowModal ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.1s;
  will-change: transform;
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

const ListLogoutBtns = styled.ul`
  display: flex;
  font-size: 14px;
`;

const BtnStyle = css`
  width: 126px;
  padding: 15px 0;
`;

const BtnCancel = styled.button`
  ${BtnStyle}
  position: relative;

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

const BtnLogout = styled.button`
  ${BtnStyle}
  color: ${PRIMARY};
`;

const BtnMore = styled.button`
  width: 24px;
  height: 24px;
  background: url('/icons/header/more.svg') no-repeat 50% 50%;
`;
