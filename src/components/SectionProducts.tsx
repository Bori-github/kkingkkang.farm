import styled from '@emotion/styled';
import { GRAY_900, PRIMARY, WHITE } from '../constants/colors';

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
  background-color: ${WHITE};
`;
const TitleProducts = styled.h2`
  margin-bottom: 15px;
  color: ${GRAY_900};
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
  color: ${GRAY_900};
  font-size: 14px;
`;
const PriceProduct = styled.strong`
  color: ${PRIMARY};
  font-size: 12px;
  font-weight: 700;
`;
