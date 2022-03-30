import styled from '@emotion/styled';
import { BORDER, USER_AVATAR } from '../constants';
import { GRAY_900, WHITE } from '../constants/colors';
import { UserAvatar } from './UserAvatar';

export const SectionFeed = () => {
  return (
    <Container>
      <h2 className="sr-only">피드 보기</h2>
      <Toolbar>
        <BtnListType type="button" className="active">
          <span className="sr-only">리스트 형</span>
        </BtnListType>
        <BtnAlbumType type="button">
          <span className="sr-only">앨범 형</span>
        </BtnAlbumType>
      </Toolbar>
      <Feed>
        <BoxProfileImg>
          <UserAvatar size={USER_AVATAR.md.size} src="/default-profile-w.png" />
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
            옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다.
            이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할 넣는
            풍부하게 뛰노는 인생의 힘있다.
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
    </Container>
  );
};

const Container = styled.section`
  /* display: none; */
  margin-top: 10px;
  background-color: ${WHITE};
`;
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
const Feed = styled.article`
  display: grid;
  grid-template-columns: 50px auto;
  grid-template-rows: 50px auto;
  gap: 10px;
  padding: 20px;
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
