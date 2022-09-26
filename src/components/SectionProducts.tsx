import styled from '@emotion/styled';
import useSWR from 'swr';
import { API_ENDPOINT } from '../constants';
import { GRAY_900, PRIMARY, WHITE } from '../constants/colors';
import { fetcher } from '../utils';
import { Loader } from './common/Loader';

interface SectionProductsProps {
  accountname: string;
}

export const SectionProducts = ({ accountname }: SectionProductsProps) => {
  const { data, error } = useSWR(
    `${API_ENDPOINT}/product/${accountname}`,
    fetcher,
  );

  if (!data) return <Loader height="auto" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  const { product } = data;

  return (
    <div>
      {product.length > 0 && (
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
      )}
    </div>
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
