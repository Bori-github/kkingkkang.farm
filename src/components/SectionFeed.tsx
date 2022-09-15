import styled from '@emotion/styled';
import { useState } from 'react';
import { BORDER } from '../constants';
import { WHITE } from '../constants/colors';
import { AlbumTypeContainer } from './feed/AlbumTypeContainer';
import { UserFeedContainer } from './feed/UserFeedContainer';

export const SectionFeed = () => {
  const [listType, setListType] = useState<boolean>(true);

  return (
    <Section>
      <h2 className="sr-only">피드 보기</h2>
      <Toolbar>
        <BtnListType
          type="button"
          className={listType ? 'active' : ''}
          onClick={() => setListType(true)}
        >
          <span className="sr-only">리스트 형</span>
        </BtnListType>
        <BtnAlbumType
          type="button"
          className={!listType ? 'active' : ''}
          onClick={() => setListType(false)}
        >
          <span className="sr-only">앨범 형</span>
        </BtnAlbumType>
      </Toolbar>
      {listType ? <UserFeedContainer /> : <AlbumTypeContainer />}
    </Section>
  );
};

const Section = styled.section`
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
