import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { HeaderUserPage } from '../components/layouts/Header';
import { Reply } from '../components/Reply';
import { SectionReplies } from '../components/SectionReplies';
import { BORDER, COLORS } from '../constants';

const Post: NextPage = () => {
  return (
    <>
      <Head>
        <title>유저 이름(유저 아이디)ㅣ낑깡팜</title>
      </Head>
      <HeaderUserPage />
      <MainPost>
        <Feed>
          <h2 className="sr-only">피드 보기</h2>
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
            <ContCarousel>
              <Carousel>
                <CarouselSlide id="slide1">
                  <img src="/example/post-img-example.png" alt="피드 이미지" />
                </CarouselSlide>
                <CarouselSlide id="slide2">
                  <img src="/example/post-img-example.png" alt="피드 이미지" />
                </CarouselSlide>
                <CarouselSlide id="slide3">
                  <img src="/example/post-img-example.png" alt="피드 이미지" />
                </CarouselSlide>
              </Carousel>
              <CarouselNav>
                <a href="#slide1">
                  <span className="sr-only">1</span>
                </a>
                <a href="#slide2">
                  <span className="sr-only">2</span>
                </a>
                <a href="#slide3">
                  <span className="sr-only">3</span>
                </a>
              </CarouselNav>
            </ContCarousel>
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
        <SectionReplies />
        <Reply />
      </MainPost>
    </>
  );
};

export default Post;

const MainPost = styled.main`
  margin: 49px 0 51px;
`;
const Feed = styled.section`
  display: grid;
  grid-template-columns: 50px auto;
  grid-template-rows: 50px auto;
  gap: 10px;
  padding: 20px;
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
const ContCarousel = styled.div`
  position: relative;
`;
const Carousel = styled.ul`
  overflow-x: auto;
  display: flex;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`;
const CarouselSlide = styled.li`
  min-width: 100%;
  scroll-snap-align: center;
  position: relative;

  &:not(:first-of-type) {
    margin-left: 10px;
  }
`;
const CarouselNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);

  & a {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 3px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
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
