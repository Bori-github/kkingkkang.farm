import styled from '@emotion/styled';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { mutate } from 'swr';
import {
  API_ENDPOINT,
  USER_AVATAR,
  Z_INDEX,
  BORDER,
  BUTTON,
} from '../../constants';
import { WHITE } from '../../constants/colors';
import { fetcher } from '../../utils';
import { Loader } from '../common/Loader';
import { UserAvatar } from '../UserAvatar';

interface PostProps {
  postData: {
    id: string;
  };
}

export const SectionInputReply = ({ postData }: PostProps) => {
  const { id: postID } = postData;
  const accountname = Cookies.get('accountname');
  const token = Cookies.get('token');
  const { data, error } = useSWR(
    `${API_ENDPOINT}/profile/${accountname}`,
    fetcher,
  );
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const handleTextarea = (e: FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto';
    const { scrollHeight } = e.currentTarget;
    e.currentTarget.style.height = `${scrollHeight - 10}px`;
  };

  const handleComment = handleSubmit(async () => {
    const { comment } = getValues();
    const { data } = await axios(
      `${API_ENDPOINT}/post/${postID}/comments/?limit=1000`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        data: JSON.stringify({
          comment: {
            content: comment,
          },
        }),
      },
    );

    if (data.comment !== []) {
      mutate(`${API_ENDPOINT}/post/${postID}/comments/?limit=1000`);
      setValue('comment', '');
    }
  });

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <Contaioner>
      <h3 className="sr-only">댓글 입력</h3>
      <UserAvatar size={USER_AVATAR.sm.size} src={data.profile.image} />
      <Form onSubmit={handleComment}>
        <TextArea
          rows={1}
          placeholder={`${data.profile.username}(으)로 댓글 달기...`}
          onInput={handleTextarea}
          {...register('comment', {
            required: true,
          })}
        />
        <BtnSend type="submit" disabled={!isValid}>
          게시
        </BtnSend>
      </Form>
    </Contaioner>
  );
};

const Contaioner = styled.article`
  display: grid;
  grid-template-columns: 42px auto;
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
  grid-template-columns: auto 50px;
  gap: 10px;
  align-items: center;
`;

const TextArea = styled.textarea`
  padding: 5px 0;
  border: 0;
  resize: none;
`;

const BtnSend = styled.button`
  padding: 5px;
  border-radius: 26px;
  background-color: ${BUTTON.background_color};
  color: ${WHITE};

  &:disabled {
    background-color: ${BUTTON.disabled_color};
  }
`;
