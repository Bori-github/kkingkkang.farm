import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { MouseEvent, useCallback, useRef, useState } from 'react';
import useSWR from 'swr';
import { Loader } from '../../components/common/Loader';
import { HeaderUserPage } from '../../components/layouts/Header';
import { Navigation } from '../../components/layouts/Navigation';
import {
  PopupMoreUser,
  PopupPost,
  PopupPostDelete,
  PopupProducDelete,
  PopupProduct,
} from '../../components/Popup';
import { SectionFeed } from '../../components/SectionFeed';
import { SectionProducts } from '../../components/SectionProducts';
import {
  SectionMyInfo,
  SectionUserInfo,
} from '../../components/SectionUserInfo';
import { API_ENDPOINT, Z_INDEX } from '../../constants';
import { GRAY_900, WHITE, GRAY_300 } from '../../constants/colors';
import { fetcher } from '../../utils';

interface ModalProps {
  isShowModal: boolean;
}

const UserPage: NextPage = () => {
  const accountname = Cookies.get('accountname') || '';

  // const [isShowPopup, setIsShowPopup] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModal = useCallback(() => {
    setIsShowModal(!isShowModal);
  }, [isShowModal]);

  const { data, error } = useSWR(
    `${API_ENDPOINT}/profile/${accountname}`,
    fetcher,
  );

  const handleCloseModal = (e: MouseEvent<HTMLElement>) => {
    if (modalRef.current === e.target) {
      setIsShowModal(false);
      // setIsShowPopup(false);
    }
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
      <HeaderUserPage headerTitle={username} handleModal={handleModal} />
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
            ref={modalRef}
            onClick={handleCloseModal}
            isShowModal={isShowModal}
          />
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
                <button type="button">로그아웃</button>
              </ItemMore>
            </ul>
          </ModalPopup>
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
  /* z-index: ${Z_INDEX.popup}; */
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
