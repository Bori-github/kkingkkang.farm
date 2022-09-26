import styled from '@emotion/styled';
import Link from 'next/link';
import useSWR from 'swr';
import { API_ENDPOINT } from '../constants';
import { GRAY_900, PRIMARY, WHITE } from '../constants/colors';
import { ProductData } from '../types/ProductData';
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
            <List>
              {product.map((item: ProductData) => {
                const { id, itemName, price, itemImage, link } = item;
                return (
                  <Item key={`product-list-${id}`}>
                    <ImgProduct src={itemImage} alt={`${itemName} 이미지`} />
                    <TitleProduct>{itemName}</TitleProduct>
                    <PriceProduct>{price}원</PriceProduct>
                  </Item>
                );
              })}
            </List>
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

const List = styled.ul`
  overflow-x: auto;
  display: flex;
`;

const Item = styled.li`
  min-width: 140px;

  &:not(:first-of-type) {
    margin-left: 10px;
  }
`;

const ImgProduct = styled.img`
  width: 140px;
  height: 90px;
  border-radius: 8px;
  object-fit: cover;
`;

const TitleProduct = styled.p`
  margin: 0;
  padding: 8px 0 6px;
  color: ${GRAY_900};
  font-size: 14px;
`;

const PriceProduct = styled.strong`
  color: ${PRIMARY};
  font-size: 12px;
  font-weight: 700;
`;
