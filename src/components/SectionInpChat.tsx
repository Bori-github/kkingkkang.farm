import styled from '@emotion/styled';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { API_ENDPOINT, BORDER, BUTTON, Z_INDEX } from '../constants';
import { GRAY_300, SECONDARY, WHITE } from '../constants/colors';
import { PostData } from '../types';

interface SectionInpChatProps {
  mutate: () => void;
}

export const SectionInpChat = ({ mutate }: SectionInpChatProps) => {
  const token = Cookies.get('token');
  const {
    register,
    formState: { isSubmitting, isValid },
    handleSubmit,
    setValue,
  } = useForm<PostData>({ mode: 'onChange' });
  const [image, setImage] = useState<string>('');

  const handleImageUpload = async (imageFiles: FileList) => {
    const imgData = new FormData();
    imgData.append('image', imageFiles[0]);

    const uploadImg = await axios(`${API_ENDPOINT}/image/uploadfile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: imgData,
    });
    setImage(`${API_ENDPOINT}/${uploadImg.data.filename}`);
  };

  const onSubmit: SubmitHandler<PostData> = async (data) => {
    const { content } = data;

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

      setValue('content', '');
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Contaioner>
      <h3 className="sr-only">채팅 입력</h3>
      <div>
        <Label htmlFor="uploadImag" isSelected={image.length > 0}>
          <span className="sr-only">사진 업로드</span>
        </Label>
        <input
          type="file"
          id="uploadImag"
          accept="image/*"
          className="sr-only"
          {...register('image', {
            onChange: (e) => handleImageUpload(e.target.files),
          })}
        />
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InpTxt
          type="text"
          placeholder="메시지 입력하기"
          {...register('content', { required: true })}
        />
        <BtnSend type="submit" disabled={!isValid || isSubmitting} />
      </Form>
    </Contaioner>
  );
};

const Contaioner = styled.article`
  display: grid;
  grid-template-columns: 36px auto;
  align-items: center;
  gap: 10px;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_INDEX.header};
  padding: 5px;
  border-top: ${BORDER.basic};
  background-color: ${WHITE};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: auto 40px;
  gap: 10px;
  align-items: center;
`;

const InpTxt = styled.input`
  padding: 5px 0;
  border: 0;
  background: none;
`;

const BtnSend = styled.button`
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 4px;
  background: url('/icons/post/send.svg') no-repeat 50% 50%;
  background-color: ${BUTTON.background_color};
  color: ${WHITE};

  &:disabled {
    background-color: ${BUTTON.disabled_color};
  }
`;

const Label = styled.label<{ isSelected: boolean }>`
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: url('/icons/img/image.svg') no-repeat 50% 50%;
  background-color: ${({ isSelected }) => (isSelected ? SECONDARY : GRAY_300)};
  cursor: pointer;
`;
