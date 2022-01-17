import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { HeaderUserPage } from '../components/layouts/Header';
import { Navigation } from '../components/layouts/Navigation';
import { BORDER, COLORS } from '../constants';

const UserPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>유저 이름(유저 아이디)ㅣ낑깡팜</title>
      </Head>
      <HeaderUserPage />
      <MainUserPage>
        <SectionUserInfo>
          <h2 className="sr-only">유저 정보</h2>
          <BoxUser>
            <Link href="/list-followers">
              <LinkFollowers>
                <span className="count-followers">2950</span>
                <span>followers</span>
              </LinkFollowers>
            </Link>
            <ImgUser src="/default-profile-w.png" alt="유저 프로필 이미지" />
            <Link href="/list-followings">
              <LinkFollowings>
                <span className="count-followings">128</span>
                <span>followings</span>
              </LinkFollowings>
            </Link>
          </BoxUser>
          <span className="user-name">애월읍 낑깡농장</span>
          <span className="user-id">@kkingkkang_farm</span>
          <p className="user-desc">
            애월읍 낑깡 전국 배송, 낑깡따기 체험, 낑깡 농장
          </p>
          <ListBtns>
            <li>
              <BtnMsg type="button">
                <span className="sr-only">메시지 보내기</span>
              </BtnMsg>
            </li>
            <li>
              <BtnFollow type="button">팔로우</BtnFollow>
            </li>
            <li>
              <BtnShare type="button">
                <span className="sr-only">공유하기</span>
              </BtnShare>
            </li>
          </ListBtns>
        </SectionUserInfo>
        <SectionProducts>
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
        </SectionProducts>
        <SectionFeed>
          <h2 className="sr-only">게시글 보기</h2>
          <Toolbar>
            <BtnListType type="button">
              <span className="sr-only">리스트 형</span>
            </BtnListType>
            <BtnAlbumType type="button">
              <span className="sr-only">앨범 형</span>
            </BtnAlbumType>
          </Toolbar>
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
        </SectionFeed>
      </MainUserPage>
      <Navigation />
    </>
  );
};

export default UserPage;

const MainUserPage = styled.main`
  margin: 49px 0 60px;
  background-color: #f2f2f2;

  & section {
    background-color: #fff;
  }
`;

const SectionUserInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;

  & .user-name {
    margin: 16px 0 6px;
    color: ${COLORS.black};
    font-size: 18px;
    font-weight: 700;
  }
  & .user-id {
    font-size: 12px;
  }
  & .user-desc {
    margin: 16px 0 24px;
    font-size: 14px;
  }
`;
const BoxUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LinkFollowers = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  font-size: 10px;

  & .count-followers {
    color: ${COLORS.black};
    font-size: 18px;
    font-weight: 700;
  }
`;
const ImgUser = styled.img`
  width: 90px;
  margin: 0 40px;
  padding: 10px;
  border-radius: 50%;
  background-color: ${COLORS.light_gray};
`;
const LinkFollowings = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  font-size: 10px;

  & .count-followings {
    font-size: 18px;
    font-weight: 700;
  }
`;
const ListBtns = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BtnMsg = styled.button`
  width: 34px;
  height: 34px;
  border: ${BORDER.basic};
  border-radius: 50%;
  background: url('/icons/message-sm.svg') no-repeat 50% 50%;
`;
const BtnFollow = styled.button`
  margin: 0 10px;
  padding: 10px 40px;
  border-radius: 32px;
  background-color: ${COLORS.accent_light_green};
  color: #fff;
`;
const BtnShare = styled.button`
  width: 34px;
  height: 34px;
  border: ${BORDER.basic};
  border-radius: 50%;
  background: url('/icons/share.svg') no-repeat 50% 50%;
`;

const SectionProducts = styled.section`
  margin: 10px 0;
  padding: 20px;
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

const Feed = styled.article`
  display: grid;
  grid-template-columns: 50px auto;
  grid-template-rows: 50px auto;
  gap: 10px;
  margin: 20px 0;
  padding: 0 20px 20px;
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

const SectionFeed = styled.section``;
const Toolbar = styled.div`
  padding: 6px 20px;
  border-bottom: ${BORDER.basic};
  text-align: right;
`;
const BtnListType = styled.button`
  width: 26px;
  height: 26px;
  background: url('/icons/post/post-list-off.svg') no-repeat;

  &.active {
    background-image: url('/icons/post/post-list-on.svg');
  }
`;
const BtnAlbumType = styled.button`
  width: 26px;
  height: 26px;
  margin-left: 10px;
  background: url('/icons/post/post-album-off.svg') no-repeat;
  background-size: 100%;

  &.active {
    background-image: url('/icons/post/post-album-on.svg');
  }
`;
