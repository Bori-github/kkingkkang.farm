import styled from '@emotion/styled';
import { BORDER, COLORS } from '../../constants';

const Feed = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 12px 16px;
  border-bottom: ${BORDER.basic};
  background-color: #fff;
  color: ${COLORS.black};
  font-size: 18px;
  font-weight: 700;

  & .btn-search-user {
    width: 24px;
    height: 24px;
    background: url('/icons/header/search.svg') no-repeat 50% 50%;
  }
`;

export const HeaderFeed = () => {
  return (
    <Feed>
      <span>낑깡팜 피드</span>
      <button type="button" className="btn-search-user">
        <span className="sr-only">유저 검색하기</span>
      </button>
    </Feed>
  );
};
