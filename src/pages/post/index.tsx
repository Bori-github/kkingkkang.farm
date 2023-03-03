import styled from '@emotion/styled';
import axios from 'axios';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Loader } from '../../components/common/Loader';
import { Layout } from '../../components/layouts/Layout';
import { Navigation } from '../../components/layouts/Navigation';
import { ToolBar } from '../../components/layouts/ToolBar';
import { handleTextarea } from '../../components/post/handleTextarea';
import { UserAvatar } from '../../components/UserAvatar';
import { API_ENDPOINT, BUTTON, USER_AVATAR } from '../../constants';
import { GRAY_400 } from '../../constants/colors';
import { PostData } from '../../types';
import { fetcher } from '../../utils/fetcher';
import { NextPageWithLayout } from '../_app';

const UploadPostPage: NextPageWithLayout = () => {
  const router = useRouter();

  const token = Cookies.get('token');
  const accountname = Cookies.get('accountname') || '';

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PostData>({ mode: 'onChange' });

  const [profileImg, setProfileImg] = useState('/default-profile-w.png');
  const [imageList, setImageList] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data, error } = useSWR(
    `${API_ENDPOINT}/profile/${accountname}`,
    fetcher,
  );

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    setProfileImg(image);
  }, [data]);

  const handleImageUpload = (imageFiles: FileList) => {
    if (imageFiles) {
      for (let i = 0; i < imageFiles.length; i++) {
        if (i + imageList.length >= 3) {
          alert('이미지는 최대 3장까지 선택할 수 있습니다.');
          break;
        }
        const imageUrl = URL.createObjectURL(imageFiles[i]);
        setImageList((state) => [...state, imageUrl]);
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    setImageList((state) => state.filter((_, i) => i !== index));
    URL.revokeObjectURL(imageList[index]);
  };

  const onSubmit: SubmitHandler<PostData> = async (e) => {
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

    const fileNameList: string[] = [];
    for (let i = 0; i < data.length; i++) {
      fileNameList.push(`${API_ENDPOINT}/${data[i].filename}`);
    }

    const content = textareaRef.current?.value;
    const image = fileNameList.join();

    try {
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

      alert('게시글이 작성되었습니다:)');
      router.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  const { image } = data.profile;

  return (
    <>
      <Head>
        <title>새 게시글ㅣ낑깡팜</title>
      </Head>
      <ToolBar title="새 게시글" />
      <Section>
        <UserAvatar size={USER_AVATAR.sm.size} src={profileImg} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            placeholder="게시글 입력하기"
            {...register('content', {
              onChange: () =>
                handleTextarea(textareaRef.current as HTMLTextAreaElement),
            })}
            ref={textareaRef}
          />
          <Label htmlFor="uploadImg">
            <span className="sr-only">사진 업로드 버튼</span>
            <input
              type="file"
              id="uploadImg"
              accept="image/*"
              multiple
              className="sr-only"
              {...register('image', {
                onChange: (e) => handleImageUpload(e.target.files),
              })}
            />
          </Label>
          <SubmitButton type="submit" disabled={isSubmitting}>
            <span className="sr-only">업로드</span>
          </SubmitButton>
        </form>
        <ImageContainer>
          <ImageList>
            {imageList.length > 0 &&
              imageList.map((image, index) => {
                return (
                  <ImageItem key={`list-upload-img-${Math.random()}`}>
                    <Image src={image} alt="피드 이미지" />
                    <DeleteButton
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <span className="sr-only">업로드 이미지 삭제</span>
                    </DeleteButton>
                  </ImageItem>
                );
              })}
          </ImageList>
        </ImageContainer>
      </Section>
    </>
  );
};

UploadPostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
      <Navigation />
    </Layout>
  );
};

export default UploadPostPage;

const Section = styled.section`
  display: grid;
  grid-template-columns: 42px auto;
  gap: 10px;
  margin-top: 49px;
  padding: 20px;
`;

const Textarea = styled.textarea`
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

const ImageContainer = styled.div`
  overflow: hidden;
  grid-column: 2 / 3;
`;

const ImageList = styled.ul`
  overflow-x: auto;
  display: flex;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`;

const ImageItem = styled.li`
  position: relative;
  min-width: 180px;
  scroll-snap-align: start;

  & + & {
    margin-left: 10px;
  }
`;

const Image = styled.img`
  height: 180px;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 25px;
  height: 25px;
  background: url('/icons/img/close.svg') no-repeat;
  background-size: 100%;
`;

const Label = styled.label`
  position: absolute;
  right: 20px;
  bottom: 140px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: url('/icons/img/image.svg') no-repeat 50% 50%
    ${BUTTON.background_color};
  cursor: pointer;
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 80px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: url('/icons/upload.svg') no-repeat 50% 50%
    ${BUTTON.background_color};
`;
