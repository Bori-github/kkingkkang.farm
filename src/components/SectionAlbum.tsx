import styled from '@emotion/styled';
import { BORDER } from '../constants';
import { WHITE } from '../constants/colors';

export const SectionAlbum = () => {
  return (
    <Container>
      <Toolbar>
        <BtnListType type="button">
          <span className="sr-only">리스트 형</span>
        </BtnListType>
        <BtnAlbumType type="button" className="active">
          <span className="sr-only">앨범 형</span>
        </BtnAlbumType>
      </Toolbar>
      <ListAlbum>
        <ItemAlbum className="more-photos">
          <img src="/example/album1.png" alt="앨범 이미지" />
        </ItemAlbum>
        <ItemAlbum>
          <img src="/example/album2.png" alt="앨범 이미지" />
        </ItemAlbum>
        <ItemAlbum>
          <img src="/example/album3.png" alt="앨범 이미지" />
        </ItemAlbum>
        <ItemAlbum>
          <img src="/example/album4.png" alt="앨범 이미지" />
        </ItemAlbum>
        <ItemAlbum>
          <img src="/example/album5.png" alt="앨범 이미지" />
        </ItemAlbum>
        <ItemAlbum>
          <img src="/example/album6.png" alt="앨범 이미지" />
        </ItemAlbum>
        <ItemAlbum className="more-photos">
          <img src="/example/album7.png" alt="앨범 이미지" />
        </ItemAlbum>
        <ItemAlbum>
          <img src="/example/album8.png" alt="앨범 이미지" />
        </ItemAlbum>
        <ItemAlbum>
          <img src="/example/album9.png" alt="앨범 이미지" />
        </ItemAlbum>
      </ListAlbum>
    </Container>
  );
};

const Container = styled.section`
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
const ListAlbum = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px 15px;
`;
const ItemAlbum = styled.li`
  position: relative;
  margin: 5px;

  &.more-photos::after {
    content: '';
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    background: url('/icons/img/img-layers.svg') no-repeat;
    background-size: 100%;
  }
`;
