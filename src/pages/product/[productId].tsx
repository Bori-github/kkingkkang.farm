import styled from '@emotion/styled';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useSWR from 'swr';
import { Loader } from '../../components/common/Loader';
import { Navigation } from '../../components/layouts/Navigation';
import { ToolBar } from '../../components/layouts/ToolBar';
import { API_ENDPOINT, BORDER, BUTTON } from '../../constants';
import {
  GRAY_900,
  GRAY_300,
  PRIMARY,
  GRAY_200,
  ERROR,
} from '../../constants/colors';
import { ProductData } from '../../types/ProductData';
import { fetcher } from '../../utils';

const EditProductPage: NextPage = () => {
  const token = Cookies.get('token');
  const router = useRouter();
  const { productId } = router.query;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ProductData>({ mode: 'onChange' });
  const [image, setImage] = useState<string>('');

  const { data, error } = useSWR(
    `${API_ENDPOINT}/product/detail/${productId}`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      setImage(data.product.itemImage);
      reset(data.product);
    }
    console.log(image);
  }, [data]);

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

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

  const onSubmit: SubmitHandler<ProductData> = async (data) => {
    const { itemName, price, link } = data;

    try {
      await axios(`${API_ENDPOINT}/product/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        data: JSON.stringify({
          product: {
            itemName,
            price,
            link,
            itemImage: image,
          },
        }),
      });

      alert(`${itemName}이 수정되었습니다.`);
      router.push('/user-page');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>상품 수정ㅣ낑깡팜</title>
      </Head>
      <Section>
        <h2 className="sr-only">상품 수정 페이지</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ToolBar title="상품 수정">
            <button type="submit">수정</button>
          </ToolBar>
          <BoxInp>
            <label htmlFor="itemImage">이미지 등록</label>
            <BoxUploadImg>
              <span>이미지 미리보기</span>
              <input
                type="file"
                id="itemImage"
                accept="image/*"
                className="sr-only"
                {...register('itemImage', {
                  required: !image,
                  onChange: (e) => handleImageUpload(e.target.files),
                })}
              />
              <LabelUploadImage htmlFor="itemImage">
                <span className="sr-only">사진 업로드 버튼</span>
              </LabelUploadImage>
              {image && <Image src={image} alt="상품" />}
            </BoxUploadImg>
            {errors.itemImage?.type === 'required' && (
              <TxtError>* 이미지를 선택해주세요.</TxtError>
            )}
          </BoxInp>
          <BoxInp>
            <label htmlFor="itemName">상품명</label>
            <Input
              type="text"
              id="itemName"
              placeholder="2~15자 이내여야 합니다."
              {...register('itemName', {
                required: true,
                minLength: 2,
                maxLength: 15,
              })}
            />
            {errors.itemName?.type === 'required' ? (
              <TxtError>* 필수 입력사항 입니다.</TxtError>
            ) : (
              (errors?.itemName?.type === 'minLength' ||
                errors?.itemName?.type === 'maxLength') && (
                <TxtError>* 2~15자 이내여야 합니다.</TxtError>
              )
            )}
          </BoxInp>
          <BoxInp>
            <label htmlFor="price">가격</label>
            <Input
              type="number"
              id="price"
              placeholder="숫자만 입력 가능합니다."
              {...register('price', { required: true, valueAsNumber: true })}
            />
            {errors.price?.type === 'required' && (
              <TxtError>* 필수 입력사항 입니다.</TxtError>
            )}
          </BoxInp>
          <BoxInp>
            <label htmlFor="link">판매 링크</label>
            <Input
              type="text"
              id="link"
              placeholder="URL을 입력해주세요."
              {...register('link', { required: true })}
            />
            {errors.link?.type === 'required' && (
              <TxtError>* 필수 입력사항 입니다.</TxtError>
            )}
          </BoxInp>
        </Form>
      </Section>
      <Navigation />
    </>
  );
};

export default EditProductPage;

const Section = styled.section`
  margin-top: 49px;
  padding: 30px 34px;
`;

const Form = styled.form`
  width: 100%;
  font-size: 12px;
`;

const BoxInp = styled.div`
  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px 0 8px;
  border: 0;
  border-bottom: ${BORDER.basic};
  color: ${GRAY_900};
  font-size: 14px;

  &::placeholder {
    color: ${GRAY_300};
  }

  &:focus,
  &:active {
    border-color: ${PRIMARY};
  }
`;

const BoxUploadImg = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 250px;
  margin: 18px 0;
  border-radius: 10px;
  background-color: ${GRAY_200};
`;

const LabelUploadImage = styled.label`
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 1;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: url('/icons/img/image.svg') no-repeat ${BUTTON.background_color}
    50% 50%;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TxtError = styled.span`
  display: block;
  margin-top: 6px;
  color: ${ERROR};
  font-size: 12px;
`;
