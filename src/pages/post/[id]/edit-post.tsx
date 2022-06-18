import styled from '@emotion/styled';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Loader } from '../../../components/common/Loader';
import { HeaderBtnPrev } from '../../../components/layouts/Header';
import { UserAvatar } from '../../../components/UserAvatar';
import { API_ENDPOINT, BUTTON, USER_AVATAR } from '../../../constants';
import { GRAY_400 } from '../../../constants/colors';
import { fetcher } from '../../../utils/fetcher';

const EditPost: NextPage = () => {
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
  });
  const [imgList, setImgList] = useState<Array<string>>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `${API_ENDPOINT}/post/${id}` : null,
    fetcher,
  );
  const token = Cookies.get('token');

  useEffect(() => {
    if (textareaRef.current instanceof Element) {
      textareaRef.current.value = data.post.content;
    }
  }, [data]);

  const handleTextarea = () => {
    if (textareaRef.current instanceof Element) {
      const { scrollHeight, style } = textareaRef.current;
      style.height = 'auto';
      style.height = `${scrollHeight}px`;
    }
  };

  const onUploadImgs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFiles = e.target.files;

    if (imgFiles) {
      for (let i = 0; i < imgFiles.length; i++) {
        if (i + imgList.length + 1 > 3) {
          alert('이미지는 최대 3장까지 선택할 수 있습니다.');
          break;
        }
        const ImgUrl = URL.createObjectURL(imgFiles[i]);
        setImgList((state) => [...state, ImgUrl]);
      }
    }
  };

  const deleteUploadImg = (idx: number) => {
    setImgList((state) => state.filter((_, index) => index !== idx));
    URL.revokeObjectURL(imgList[idx]);
  };

  const onHandleSubmit = handleSubmit(async (e) => {
    const imgData = new FormData();

    for (let i = 0; i < e.image.length; i++) {
      imgData.append('image', e.image[i]);
    }

    const { data } = await axios(
      `${API_ENDPOINT}/image/uploadfiles
    `,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        data: imgData,
      },
    );

    const fileNameList = [];
    for (let i = 0; i < data.length; i++) {
      fileNameList.push(`${API_ENDPOINT}/${data[i].filename}`);
    }

    const content = textareaRef.current?.value;
    const image = fileNameList.join();

    await axios(`${API_ENDPOINT}/post`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      data: JSON.stringify({
        post: {
          content,
          image,
        },
      }),
    });
    router.push('/user-page');
  });

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <>
      <Head>
        <title>게시글 수정ㅣ낑깡팜</title>
      </Head>
      <HeaderBtnPrev headerTitle="게시물 수정" />
      <MainUpload>
        <SectionUpload>
          <BoxProfileImg>
            <UserAvatar
              size={USER_AVATAR.sm.size}
              src={data.post.author.image}
            />
          </BoxProfileImg>
          <form onSubmit={onHandleSubmit}>
            <TextUpload
              name="textarea"
              placeholder="게시글 입력하기"
              ref={textareaRef}
              onInput={handleTextarea}
            />
            <LabelUploadImg htmlFor="uploadImg">
              <span className="sr-only">사진 업로드 버튼</span>
              <input
                type="file"
                id="uploadImg"
                accept="image/*"
                multiple
                className="sr-only"
                {...register('image', {
                  onChange: onUploadImgs,
                })}
              />
            </LabelUploadImg>
            <BtnUpload type="submit">
              <span className="sr-only">업로드</span>
            </BtnUpload>
          </form>
          <ContUploadImg>
            <ListUploadImg>
              {imgList.map((img, idx) => {
                return (
                  <ItemUploadImg
                    id="slide1"
                    key={`list-upload-img-${Math.random()}`}
                  >
                    <ImgUpload src={img} alt="피드 이미지" />
                    <BtnCancel
                      type="button"
                      onClick={() => deleteUploadImg(idx)}
                    >
                      <span className="sr-only">업로드 이미지 삭제</span>
                    </BtnCancel>
                  </ItemUploadImg>
                );
              })}
            </ListUploadImg>
          </ContUploadImg>
        </SectionUpload>
      </MainUpload>
    </>
  );
};

export default EditPost;

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
  margin-top: 13px;
  padding: 0;
  border: 0;
  font-size: 14px;
  line-height: 1.4;
  resize: none;

  &::placeholder {
    color: ${GRAY_400};
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

const ItemUploadImg = styled.li`
  position: relative;
  min-width: 180px;
  scroll-snap-align: start;

  & + & {
    margin-left: 10px;
  }
`;

const ImgUpload = styled.img`
  height: 180px;
  object-fit: cover;
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

const LabelUploadImg = styled.label`
  position: absolute;
  right: 20px;
  bottom: 80px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: url('/icons/img/image.svg') no-repeat 50% 50%
    ${BUTTON.background_color};
`;

const BtnUpload = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: url('/icons/upload.svg') no-repeat 50% 50%
    ${BUTTON.background_color};
`;
