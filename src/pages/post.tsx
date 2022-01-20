import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import { HeaderUserPage } from '../components/layouts/Header';
import { COLORS } from '../constants';

const Post: NextPage = () => {
  return (
    <>
      <Head>
        <title>유저 이름(유저 아이디)ㅣ낑깡팜</title>
      </Head>
      <HeaderUserPage />
      <main>
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
            <ContainerImg>
              <ul>
                <li>
                  <img src="/example/post-img-example.png" alt="피드 이미지" />
                </li>
                <li>
                  <img src="/example/post-img-example.png" alt="피드 이미지" />
                </li>
                <li>
                  <img src="/example/post-img-example.png" alt="피드 이미지" />
                </li>
              </ul>
              <ul>
                <li />
                <li />
                <li />
              </ul>
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
        <section>
          <h2 className="sr-only">댓글 보기</h2>
          <div>
            <div>
              <img src="/default-profile-w.png" alt="사용자 프로필 이미지" />
            </div>
            <div>
              <span>서귀포시 농장</span>
              <span>5분 전</span>
              <button type="button">
                <span className="sr-only">더 보기</span>
              </button>
            </div>
            <div>
              <p>게시글 답글~~!! 쵝오</p>
            </div>
          </div>
        </section>
        <article>
          <h3 className="sr-only">댓글 입력</h3>
          <div>
            <img src="/default-profile-w.png" alt="사용자 프로필 이미지" />
          </div>
          <form>
            <input type="text" placeholder="댓글 딜기..." />
            <button type="button">게시</button>
          </form>
        </article>
      </main>
    </>
  );
};

export default Post;

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
