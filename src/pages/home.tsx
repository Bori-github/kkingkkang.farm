import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { HeaderFeed } from '../components/layouts/Header';
import { Navigation } from '../components/layouts/Navigation';
import { UserAvatar } from '../components/UserAvatar';
import { BUTTON, USER_AVATAR } from '../constants';
import { GRAY_900 } from '../constants/colors';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>낑깡팜 피드ㅣ낑깡팜</title>
      </Head>
      <HeaderFeed headerTitle="낑깡팜 피드" />
      <MainHome>
        <SectionHome>
          <img src="/logo/logo-gray.png" alt="낑깡팜 로고" />
          <p>유저를 검색해 팔로우 해보세요!</p>
          <BtnSearchFollower type="button">검색하기</BtnSearchFollower>
        </SectionHome>
        <SectionFeed>
          <Feed>
            <BoxProfileImg>
              <UserAvatar
                size={USER_AVATAR.sm.size}
                src="/default-profile-w.png"
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
          <Feed>
            <BoxProfileImg>
              <UserAvatar
                size={USER_AVATAR.sm.size}
                src="/default-profile-w.png"
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
              <TxtFeed>감귤 잘 자라는 중...❤</TxtFeed>
              <ContainerImg>
                <img src="/example/post-img-example.png" alt="피드 이미지" />
              </ContainerImg>
              <ListIcons>
                <ItemIcon>
                  <BtnLike type="button" className="active">
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
          <Feed>
            <BoxProfileImg>
              <UserAvatar
                size={USER_AVATAR.sm.size}
                src="/default-profile-w.png"
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
              <ListIcons>
                <ItemIcon>
                  <BtnLike type="button" className="active">
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
      </MainHome>
      <Navigation />
    </>
  );
};

export default Home;

const MainHome = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 109px);
  margin: 49px 0 60px;
`;

const SectionHome = styled.section`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  & img {
    width: 100px;
  }
  & p {
    margin: 20px 0;
    font-size: 14px;
  }

  &.nofollowers {
    display: flex;
  }
`;
const BtnSearchFollower = styled.button`
  padding: 8px 30px;
  border-radius: 44px;
  background-color: ${BUTTON.background_color};
  color: ${BUTTON.color};
  font-weight: 700;
`;

const SectionFeed = styled.section`
  width: 100%;
`;
const Feed = styled.article`
  display: grid;
  grid-template-columns: 42px auto;
  grid-template-rows: 42px auto;
  gap: 10px;
  margin: 20px 0;
  padding: 0 16px;
`;
const BoxProfileImg = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
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
  color: ${GRAY_900};
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
