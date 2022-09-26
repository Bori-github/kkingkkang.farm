import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigation } from '../components/layouts/Navigation';
import { ToolBar } from '../components/layouts/ToolBar';
import { BORDER, BUTTON } from '../constants';
import { GRAY_200, GRAY_300, GRAY_900, PRIMARY } from '../constants/colors';
import { ProductData } from '../types/ProductData';

const AddProduct: NextPage = () => {
  const { register } = useForm<ProductData>({ mode: 'onChange' });
  const [image, setImage] = useState<string>('');

  const handleImageUpload = (imageFiles: FileList) => {
    if (imageFiles) {
      const imageUrl = URL.createObjectURL(imageFiles[0]);
      setImage(imageUrl);
    }
  };

  return (
    <>
      <Head>
        <title>상품 등록ㅣ낑깡팜</title>
      </Head>
      <Section>
        <h2 className="sr-only">상품 등록 페이지</h2>
        <Form>
          <ToolBar title="상품 등록">
            <button type="button">등록</button>
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
                required
                {...register('itemImage', {
                  onChange: (e) => handleImageUpload(e.target.files),
                })}
              />
              <LabelUploadImage htmlFor="itemImage">
                <span className="sr-only">사진 업로드 버튼</span>
              </LabelUploadImage>
              {image && <Image src={image} alt="" />}
            </BoxUploadImg>
          </BoxInp>
          <BoxInp>
            <label htmlFor="itemName">상품명</label>
            <Input
              type="text"
              id="itemName"
              placeholder="2~15자 이내여야 합니다."
              minLength={2}
              maxLength={15}
              required
              {...register('itemName')}
            />
          </BoxInp>
          <BoxInp>
            <label htmlFor="price">가격</label>
            <Input
              type="number"
              id="price"
              placeholder="숫자만 입력 가능합니다."
              required
              {...register('price')}
            />
          </BoxInp>
          <BoxInp>
            <label htmlFor="link">판매 링크</label>
            <Input
              type="text"
              id="link"
              placeholder="URL을 입력해주세요."
              required
              {...register('link')}
            />
          </BoxInp>
        </Form>
      </Section>
      <Navigation />
    </>
  );
};

export default AddProduct;

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
  margin: 18px 0 30px;
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
