import styled from '@emotion/styled';
import { BORDER, COLORS, USER_AVATAR } from '../constants';
import { UserAvatar } from './UserAvatar';

export const SectionReplies = () => {
  return (
    <Container>
      <h2 className="sr-only">댓글 보기</h2>
      <UserReply>
        <UserAvatar size={USER_AVATAR.xs.size} />
        <User>
          <UserName>서귀포시 농장</UserName>
          <Timestamp>5분 전</Timestamp>
          <BtnMore type="button">
            <span className="sr-only">더 보기</span>
          </BtnMore>
        </User>
        <TxtReply>게시글 답글~~!! 쵝오</TxtReply>
      </UserReply>
      <UserReply>
        <UserAvatar size={USER_AVATAR.xs.size} />
        <User>
          <UserName>감귤러버</UserName>
          <Timestamp>15분 전</Timestamp>
          <BtnMore type="button">
            <span className="sr-only">더 보기</span>
          </BtnMore>
        </User>
        <TxtReply>
          안녕하세요. 사진이 너무 멋있어요. 한라봉 언제 먹을 수 있나요? 기다리기
          지쳤어요 땡뻘땡뻘...
        </TxtReply>
      </UserReply>
      <UserReply>
        <UserAvatar size={USER_AVATAR.xs.size} />
        <User>
          <UserName>서귀포시 농장</UserName>
          <Timestamp>20분 전</Timestamp>
          <BtnMore type="button">
            <span className="sr-only">더 보기</span>
          </BtnMore>
        </User>
        <TxtReply>게시글 답글~~!! 쵝오</TxtReply>
      </UserReply>
    </Container>
  );
};

const Container = styled.section`
  padding: 20px 16px;
  border-top: ${BORDER.basic};
`;
const UserReply = styled.div`
  display: grid;
  grid-template-columns: 36px auto;
  column-gap: 10px;
  &:not(:first-of-type) {
    margin-top: 16px;
  }
`;
const User = styled.div`
  position: relative;
  padding-top: 8px;
`;
const UserName = styled.span`
  color: ${COLORS.black};
  font-size: 14px;
`;
const Timestamp = styled.span`
  font-size: 10px;
  &::before {
    content: '·';
    margin: 0 10px;
  }
`;
const BtnMore = styled.button`
  position: absolute;
  top: 6px;
  right: 0;
  width: 18px;
  height: 18px;
  background: url('/icons/more-sm.svg') no-repeat;
  background-size: 100%;
`;
const TxtReply = styled.p`
  grid-column: 2 / 3;
  color: ${COLORS.black};
  font-size: 14px;
  line-height: 1.4;
`;
