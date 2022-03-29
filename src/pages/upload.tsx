import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { HeaderBtnPrev } from '../components/layouts/Header';
import { UserAvatar } from '../components/UserAvatar';
import { BUTTON, COLORS, USER_AVATAR } from '../constants';

const Upload: NextPage = () => {
  return (
    <>
      <Head>
        <title>게시글 업로드ㅣ낑깡팜</title>
      </Head>
      <HeaderBtnPrev headerTitle="새 게시물" />
      <MainUpload>
        <SectionUpload>
          <BoxProfileImg>
            <UserAvatar
              size={USER_AVATAR.sm.size}
              src="/default-profile-w.png"
            />
          </BoxProfileImg>
          <form action="#">
            <p className="sr-only">게시글을 작성해주세요</p>
            <TextUpload
              name="textarea"
              id="textUpload"
              placeholder="게시글 입력하기"
            />
          </form>
          <ContUploadImg>
            <ListUploadImg>
              <ImgSlide id="slide1">
                <img src="/example/post-img-example.png" alt="피드 이미지" />
                <BtnCancel type="button">
                  <span className="sr-only">이미지 업로드 취소</span>
                </BtnCancel>
              </ImgSlide>
              <ImgSlide id="slide2">
                <img src="/example/post-img-example.png" alt="피드 이미지" />
                <BtnCancel type="button">
                  <span className="sr-only">이미지 업로드 취소</span>
                </BtnCancel>
              </ImgSlide>
              <ImgSlide id="slide3">
                <img src="/example/post-img-example.png" alt="피드 이미지" />
                <BtnCancel type="button">
                  <span className="sr-only">이미지 업로드 취소</span>
                </BtnCancel>
              </ImgSlide>
            </ListUploadImg>
          </ContUploadImg>
        </SectionUpload>
      </MainUpload>
      <BtnUploadImg type="button">
        <span className="sr-only">사진 업로드 버튼</span>
      </BtnUploadImg>
    </>
  );
};

export default Upload;

const MainUpload = styled.main`
  margin-top: 49px;
`;
const SectionUpload = styled.section`
  display: grid;
  grid-template-columns: 40px auto;
  gap: 10px;
  padding: 20px;
`;
const BoxProfileImg = styled.div`
  grid-column: 1 / 2;
`;
const TextUpload = styled.textarea`
  width: 100%;
  padding: 13px 0;
  border: 0;
  font-size: 14px;
  line-height: 1.4;
  resize: none;

  &::placeholder {
    color: ${COLORS.light_gray};
  }
`;
const ContUploadImg = styled.div`
  overflow: hidden;
  grid-column: 2 / 3;
`;
const ListUploadImg = styled.ul`
  overflow-x: auto;
  display: flex;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`;
const ImgSlide = styled.li`
  position: relative;
  min-width: 250px;
  scroll-snap-align: start;

  &:not(:first-of-type) {
    margin-left: 10px;
  }
`;
const BtnCancel = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 25px;
  height: 25px;
  background: url('/icons/img/close.svg') no-repeat;
  background-size: 100%;
`;
const BtnUploadImg = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: url('/icons/img/image.svg') no-repeat 50% 50%
    ${BUTTON.background_color};
`;
