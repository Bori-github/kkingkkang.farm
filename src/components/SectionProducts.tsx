import styled from '@emotion/styled';
import { COLORS } from '../constants';

export const SectionProducts = () => {
  return (
    <Container>
      <TitleProducts>판매중인 상품</TitleProducts>
      <div>
        <ListProducts>
          <ItemProduct>
            <ImgProduct
              src="/example/product-img-example.png"
              alt="상품 이미지"
            />
            <TitleProduct>낑깡낑깡</TitleProduct>
            <PriceProduct>35,000원</PriceProduct>
          </ItemProduct>
          <ItemProduct>
            <ImgProduct
              src="/example/product-img-example.png"
              alt="상품 이미지"
            />
            <TitleProduct>낑깡낑깡</TitleProduct>
            <PriceProduct>35,000원</PriceProduct>
          </ItemProduct>
          <ItemProduct>
            <ImgProduct
              src="/example/product-img-example.png"
              alt="상품 이미지"
            />
            <TitleProduct>낑깡 10kg</TitleProduct>
            <PriceProduct>45,000원</PriceProduct>
          </ItemProduct>
          <ItemProduct>
            <ImgProduct
              src="/example/product-img-example.png"
              alt="상품 이미지"
            />
            <TitleProduct>낑깡 파지</TitleProduct>
            <PriceProduct>25,000원</PriceProduct>
          </ItemProduct>
        </ListProducts>
      </div>
    </Container>
  );
};

const Container = styled.section`
  margin-top: 10px;
  padding: 20px;
  background-color: #fff;
`;
const TitleProducts = styled.h2`
  margin-bottom: 15px;
  color: ${COLORS.black};
  font-size: 18px;
  font-weight: 700;
`;
const ListProducts = styled.ul`
  display: flex;
  overflow-x: auto;
`;
const ItemProduct = styled.li`
  display: flex;
  flex-direction: column;
  min-width: 140px;

  &:not(:first-of-type) {
    margin-left: 10px;
  }
`;
const ImgProduct = styled.img`
  width: 100%;
  border-radius: 8px;
`;
const TitleProduct = styled.strong`
  padding: 8px 0 6px;
  color: ${COLORS.black};
  font-size: 14px;
`;
const PriceProduct = styled.strong`
  color: ${COLORS.accent_green};
  font-size: 12px;
  font-weight: 700;
`;
