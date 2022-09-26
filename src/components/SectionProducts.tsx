import styled from '@emotion/styled';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { MouseEvent, useRef, useState } from 'react';
import useSWR from 'swr';
import { API_ENDPOINT, BORDER, Z_INDEX } from '../constants';
import { GRAY_300, GRAY_900, PRIMARY, WHITE } from '../constants/colors';
import { ProductData } from '../types/ProductData';
import { fetcher } from '../utils';
import { Loader } from './common/Loader';

interface SectionProductsProps {
  accountname: string;
}

interface ModalProps {
  isShowModal: boolean;
}

export const SectionProducts = ({ accountname }: SectionProductsProps) => {
  const token = Cookies.get('token');

  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>('');
  const modalRef = useRef<(HTMLElement | null)[]>([]);

  const { data, error, mutate } = useSWR(
    `${API_ENDPOINT}/product/${accountname}`,
    fetcher,
  );

  const handleCloseModal = (e: MouseEvent<HTMLElement>) => {
    modalRef.current.forEach((el) => {
      if (el === e.target) {
        setIsShowModal(false);
        setIsShowPopup(false);
      }
    });
  };

  const handleDeleteProduct = async (productId: string) => {
    const { data } = await axios(`${API_ENDPOINT}/product/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    if (data) {
      setIsShowPopup(false);
      setIsShowModal(false);
      mutate();
    }
  };

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
                const { id, itemName, price, itemImage, link, author } = item;
                return (
                  <Item key={`product-list-${id}`}>
                    <ItemButton
                      type="button"
                      onClick={() => {
                        setIsShowModal(true);
                        setIsAuthor(author.accountname === accountname);
                        setProductId(id);
                      }}
                    >
                      <ImgProduct src={itemImage} alt={`${itemName} 이미지`} />
                      <TitleProduct>{itemName}</TitleProduct>
                      <PriceProduct>{price}원</PriceProduct>
                    </ItemButton>
                  </Item>
                );
              })}
            </List>
          </div>
          {isShowModal && (
            <BgPopup
              ref={(el) => {
                modalRef.current[0] = el;
              }}
              onClick={handleCloseModal}
            >
              {!isShowPopup ? (
                <ModalPopup isShowModal={isShowModal}>
                  <ul>
                    {isAuthor && (
                      <>
                        <ItemMore onClick={() => setIsShowPopup(true)}>
                          <button type="button">삭제</button>
                        </ItemMore>
                        <ItemMore onClick={() => setIsShowPopup(true)}>
                          <button type="button">수정</button>
                        </ItemMore>
                        <ItemMore onClick={() => setIsShowPopup(true)}>
                          <button type="button">웹사이트에서 상품 보기</button>
                        </ItemMore>
                      </>
                    )}
                  </ul>
                </ModalPopup>
              ) : (
                <Popup>
                  {isAuthor && <TxtLogout>상품을 삭제할까요?</TxtLogout>}
                  <ListModalBtns>
                    <li>
                      <BtnCancel
                        type="button"
                        ref={(el) => {
                          modalRef.current[1] = el;
                        }}
                        onClick={handleCloseModal}
                      >
                        취소
                      </BtnCancel>
                    </li>
                    <li>
                      {isAuthor && (
                        <BtnDelete
                          type="button"
                          onClick={() => handleDeleteProduct(productId)}
                        >
                          삭제
                        </BtnDelete>
                      )}
                    </li>
                  </ListModalBtns>
                </Popup>
              )}
            </BgPopup>
          )}
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

const ItemButton = styled.button`
  padding: 0;
  text-align: left;
`;

const ImgProduct = styled.img`
  width: 140px;
  height: 90px;
  border-radius: 8px;
  object-fit: cover;
`;

const TitleProduct = styled.p`
  margin: 0;
  padding: 6px 0 4px;
  color: ${GRAY_900};
  font-size: 14px;
`;

const PriceProduct = styled.strong`
  color: ${PRIMARY};
  font-size: 12px;
  font-weight: 700;
`;

const BgPopup = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${Z_INDEX.popup};
  background-color: rgba(0, 0, 0, 0.5);
  color: ${GRAY_900};
`;

const ModalPopup = styled.div<ModalProps>`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 36px 0 10px;
  border-radius: 20px 20px 0 0;
  background-color: ${WHITE};
  transform: ${(isShowModal) =>
    isShowModal ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.1s;
  will-change: transform;

  &::before {
    content: '';
    position: absolute;
    top: 16px;
    left: 50%;
    width: 50px;
    height: 4px;
    border-radius: 4px;
    background-color: ${GRAY_300};
    transform: translateX(-50%);
  }
`;

const ItemMore = styled.li`
  padding: 14px 25px;
  font-size: 14px;
`;

const Popup = styled.div`
  position: absolute;
  top: calc(50% - 30px);
  left: 50%;
  border-radius: 10px;
  background-color: ${WHITE};
  text-align: center;
  transform: translate(-50%, -50%);
`;

const TxtLogout = styled.p`
  padding: 20px 0;
  border-bottom: ${BORDER.basic};
`;

const ListModalBtns = styled.ul`
  display: flex;
  font-size: 14px;
`;

const BtnCancel = styled.button`
  position: relative;
  width: 126px;
  padding: 15px 0;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    background-color: ${GRAY_300};
  }
`;

const BtnDelete = styled.button`
  width: 126px;
  padding: 15px 0;
  color: ${PRIMARY};
`;
