import styled from '@emotion/styled';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Loader } from '../../../components/common/Loader';
import { ToolBar } from '../../../components/layouts/ToolBar';
import { handleTextarea } from '../../../components/post/handleTextarea';
import { UserAvatar } from '../../../components/UserAvatar';
import { API_ENDPOINT, BUTTON, USER_AVATAR } from '../../../constants';
import { GRAY_400 } from '../../../constants/colors';
import { PostData } from '../../../types';
import { fetcher } from '../../../utils/fetcher';

const EditPostPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PostData>({
    mode: 'onChange',
  });

  const [imageList, setImageList] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, []);

  const { data, error } = useSWR(
    id ? `${API_ENDPOINT}/post/${id}` : null,
    fetcher,
  );

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = data.post.content;
    }

    const imageData = data?.post?.image.split(',');
    setImageList(imageData);
  }, [data]);

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const imgFiles = e.target.files;
    const imgData = new FormData();

    if (imgFiles) {
      for (let i = 0; i < imgFiles.length; i++) {
        if (i + imageList.length + 1 > 3) {
          alert('이미지는 최대 3장까지 선택할 수 있습니다.');
          break;
        }
        imgData.append('image', imgFiles[i]);
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

      setImageList((state) => [...state, ...fileNameList]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImageList((state) => state.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<PostData> = async () => {
    const content = textareaRef.current?.value;
    const image = imageList.join();

    try {
      await axios(`${API_ENDPOINT}/post/${id}`, {
        method: 'PUT',
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

      alert('게시글이 수정되었습니다:)');
      router.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  const { author } = data.post;

  return (
    <>
      <Head>
        <title>게시글 수정ㅣ낑깡팜</title>
      </Head>
      <ToolBar title="게시글 수정" />
      <Section>
        <BoxProfileImg>
          <UserAvatar size={USER_AVATAR.sm.size} src={author.image} />
        </BoxProfileImg>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            {...register('content', {
              onChange: () =>
                handleTextarea(textareaRef.current as HTMLTextAreaElement),
            })}
            placeholder="게시글 입력하기"
            ref={textareaRef}
          />
          <LabelUploadImg htmlFor="uploadImg">
            <span className="sr-only">사진 업로드 버튼</span>
          </LabelUploadImg>
          <input
            type="file"
            id="uploadImg"
            accept="image/*"
            multiple
            className="sr-only"
            {...register('image', {
              onChange: handleImageUpload,
            })}
          />
          <SubmitButton type="submit" disabled={isSubmitting}>
            <span className="sr-only">업로드</span>
          </SubmitButton>
        </form>
        <PreviewContainer>
          <ImageList>
            {imageList?.length > 0 &&
              imageList.map((image, index) => {
                return (
                  <ImageItem
                    id="slide1"
                    key={`list-upload-img-${Math.random()}`}
                  >
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
        </PreviewContainer>
      </Section>
    </>
  );
};

export default EditPostPage;

const Section = styled.section`
  display: grid;
  grid-template-columns: 40px auto;
  gap: 10px;
  margin-top: 49px;
  padding: 20px;
`;

const BoxProfileImg = styled.div`
  grid-column: 1 / 2;
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

const PreviewContainer = styled.div`
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

const LabelUploadImg = styled.label`
  position: absolute;
  right: 20px;
  bottom: 80px;
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
  bottom: 20px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: url('/icons/upload.svg') no-repeat 50% 50%
    ${BUTTON.background_color};
`;
