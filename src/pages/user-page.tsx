import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { HeaderUserPage } from '../components/layouts/Header';
import { Navigation } from '../components/layouts/Navigation';
import { COLORS } from '../constants';

const UserPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>유저 이름(유저 아이디)ㅣ낑깡팜</title>
      </Head>
      <HeaderUserPage />
      <main>
        <section>
          <h2 className="sr-only">유저 정보</h2>
          <div>
            <Link href="/list-followers">
              <a>
                <span className="count-followers">2950</span>
                <span>followers</span>
              </a>
            </Link>
            <img src="/default-profile-w.png" alt="유저 프로필 이미지" />
            <Link href="/list-followings">
              <a>
                <span className="count-followings">128</span>
                <span>followings</span>
              </a>
            </Link>
          </div>
          <span>애월읍 낑깡농장</span>
          <span>@kkingkkang_farm</span>
          <p>애월읍 낑깡 전국 배송, 낑깡따기 체험, 낑깡 농장</p>
          <ul>
            <li>
              <button type="button">
                <span className="sr-only">메시지 보내기</span>
              </button>
            </li>
            <li>
              <button type="button">팔로우</button>
            </li>
            <li>
              <button type="button">
                <span className="sr-only">공유하기</span>
              </button>
            </li>
          </ul>
        </section>
        <section>
          <h2>판매중인 상품</h2>
          <div>
            <ul>
              <li>
                <img src="/example/product-img-example.png" alt="상품 이미지" />
                <strong>낑깡낑깡</strong>
                <span>35,000원</span>
              </li>
              <li>
                <img src="/example/product-img-example.png" alt="상품 이미지" />
                <strong>낑깡 10kg</strong>
                <span>45,000원</span>
              </li>
              <li>
                <img src="/example/product-img-example.png" alt="상품 이미지" />
                <strong>낑깡 파지</strong>
                <span>25,000원</span>
              </li>
            </ul>
          </div>
        </section>
        <section>
          <h2 className="sr-only">게시글 보기</h2>
          <div>
            <button type="button">
              <span className="sr-only">리스트 형</span>
            </button>
            <button type="button">
              <span className="sr-only">리스트 형</span>
            </button>
            <button type="button">
              <span className="sr-only">앨범 형</span>
            </button>
          </div>
          <Feed>
            <BoxProfileImg>
              <ImgProfile
                src="/default-profile-w.png"
                alt="사용자 프로필 이미지"
              />
            </BoxProfileImg>
            <HeaderArticle>
              <UserName>애월읍 위니브 농장</UserName>
              <UserId>@weniv_Mandarin</UserId>
              <BtnMore type="button">
                <span className="sr-only">옵션 더 보기</span>
              </BtnMore>
            </HeaderArticle>
            <ContentFeed>
              <TxtFeed>
                옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여,
                뿐이다. 이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할
                넣는 풍부하게 뛰노는 인생의 힘있다.
              </TxtFeed>
              <ContainerImg>
                <img src="/example/post-img-example.png" alt="피드 이미지" />
              </ContainerImg>
              <ListIcons>
                <ItemIcon>
                  <BtnLike type="button">
                    <span className="sr-only">좋아요</span>
                  </BtnLike>
                  <span className="count-like">58</span>
                </ItemIcon>
                <ItemIcon>
                  <BtnReply type="button">
                    <span className="sr-only">댓글</span>
                  </BtnReply>
                  <span className="count-reply">12</span>
                </ItemIcon>
              </ListIcons>
              <span className="create-at">2022년 01월 16일</span>
            </ContentFeed>
          </Feed>
        </section>
      </main>
      <Navigation />
    </>
  );
};

export default UserPage;

const Feed = styled.article`
  display: grid;
  grid-template-columns: 50px auto;
  grid-template-rows: 50px auto;
  gap: 10px;
  margin: 20px 0;
`;
const BoxProfileImg = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  width: 40px;
`;
const ImgProfile = styled.img`
  padding: 5px;
  border-radius: 50%;
  background-color: ${COLORS.light_gray};
`;
const HeaderArticle = styled.header`
  grid-column: 2 / 3;
  display: grid;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 4px 0;
`;
const UserName = styled.span`
  grid-column: 1 / 2;
  color: ${COLORS.black};
  font-size: 14px;
  font-weight: 700;
`;
const UserId = styled.span`
  grid-column: 1 / 2;
  font-size: 12px;
`;
const BtnMore = styled.button`
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  align-self: flex-start;
  width: 18px;
  height: 18px;
  background: url('/icons/header/more.svg') no-repeat;
  background-size: 100%;
`;

const ContentFeed = styled.div`
  & .create-at {
    font-size: 10px;
  }
`;
const ContainerImg = styled.div``;
const TxtFeed = styled.p`
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 1.4;
`;
const ListIcons = styled.ul`
  display: flex;
  margin: 10px 0;
  font-size: 12px;
`;
const ItemIcon = styled.li`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;
const BtnLike = styled.button`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background: url('/icons/heart.svg') no-repeat;
  background-size: 100%;

  &:hover,
  &.active {
    background-image: url('/icons/heart-fill.svg');
  }
`;
const BtnReply = styled.button`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background: url('/icons/message-sm.svg') no-repeat;
  background-size: 100%;
`;
