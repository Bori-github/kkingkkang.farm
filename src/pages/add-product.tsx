import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { HeaderBtnSave } from '../components/layouts/Header';
import { BORDER, COLORS } from '../constants';

const AddProduct: NextPage = () => {
  return (
    <>
      <Head>
        <title>상품 등록ㅣ낑깡팜</title>
      </Head>
      <HeaderBtnSave />
      <MainAddProduct>
        <section>
          <h2 className="sr-only">상품 등록 페이지</h2>
          <FormAddProduct action="#">
            <BoxInp>
              <Label htmlFor="upload-img">
                이미지 등록
                <BoxUploadImg>
                  <span>이미지 미리보기</span>
                  {/* <img src="" alt="" /> */}
                  <input type="file" id="uploadImg" accept="img/*" required />
                  <BtnUpload type="button">
                    <span className="sr-only">파일 선택 버튼</span>
                  </BtnUpload>
                </BoxUploadImg>
              </Label>
            </BoxInp>
            <BoxInp>
              <Label htmlFor="nameProduct">
                상품명
                <input
                  type="text"
                  id="nameProduct"
                  placeholder="2~15자 이내여야 합니다."
                  minLength={2}
                  maxLength={15}
                  required
                />
              </Label>
            </BoxInp>
            <BoxInp>
              <Label htmlFor="priceProduct">
                가격
                <input
                  type="number"
                  id="priceProduct"
                  placeholder="숫자만 입력 가능합니다."
                  required
                />
              </Label>
            </BoxInp>
            <BoxInp>
              <Label htmlFor="urlProduct">
                판매 링크
                <input
                  type="text"
                  id="urlProduct"
                  placeholder="URL을 입력해주세요."
                  required
                />
              </Label>
            </BoxInp>
          </FormAddProduct>
        </section>
      </MainAddProduct>
    </>
  );
};

export default AddProduct;

const MainAddProduct = styled.main`
  margin-top: 49px;
  padding: 30px 34px;
`;

const FormAddProduct = styled.form`
  width: 100%;
`;
const BoxInp = styled.div`
  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;
const Label = styled.label`
  font-size: 12px;

  & input {
    display: block;
    width: 100%;
    padding: 10px 0 8px;
    border: 0;
    border-bottom: ${BORDER.basic};
    color: ${COLORS.black};
    font-size: 14px;
  }
  & input[type='file'] {
    display: none;
  }
  & input::placeholder {
    color: ${COLORS.placeholder};
  }
  & input:focus,
  & input:active {
    border-color: ${COLORS.accent_green};
  }
`;
const BoxUploadImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 200px;
  margin: 18px 0 30px;
  border-radius: 10px;
  background-color: ${COLORS.light_gray};
`;
const BtnUpload = styled.button`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: url('/icons/img/image.svg') no-repeat ${COLORS.gray} 50% 50%;
`;
