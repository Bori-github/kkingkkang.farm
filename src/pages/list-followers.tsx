import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { HeaderListFollowers } from '../components/layouts/Header';
import { Navigation } from '../components/layouts/Navigation';
import { BORDER, COLORS } from '../constants';

const ListFollowers: NextPage = () => {
  return (
    <>
      <Head>
        <title>팔로워ㅣ낑깡팜</title>
      </Head>
      <HeaderListFollowers />
      <MainListFollowers>
        <ListFollower>
          <li>
            <Link href="/" passHref>
              <LinkFollower>
                <ImgFollower
                  src="/default-profile-w.png"
                  alt="팔로워 프로필 이미지"
                />
                <FollowerAccount>
                  <FollowerName>애월읍 위니브 농장</FollowerName>
                  <FollowerId>@weniv_Mandarin</FollowerId>
                </FollowerAccount>
                <BtnFollow type="button">팔로우</BtnFollow>
              </LinkFollower>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <LinkFollower>
                <ImgFollower
                  src="/default-profile-w.png"
                  alt="팔로워 프로필 이미지"
                />
                <FollowerAccount>
                  <FollowerName>애월읍 위니브 농장</FollowerName>
                  <FollowerId>@weniv_Mandarin</FollowerId>
                </FollowerAccount>
                <BtnCancel type="button">취소</BtnCancel>
              </LinkFollower>
            </Link>
          </li>
        </ListFollower>
      </MainListFollowers>
      <Navigation />
    </>
  );
};

export default ListFollowers;

const MainListFollowers = styled.main`
  margin: 49px 0 60px;
  padding: 0 16px;
`;
const ListFollower = styled.ul`
  display: grid;
  gap: 15px;
  padding: 20px 0;
`;
const LinkFollower = styled.a`
  display: grid;
  grid-template-columns: 50px auto 56px;
  gap: 10px;
`;
const ImgFollower = styled.img`
  width: 40px;
  padding: 5px;
  border-radius: 50%;
  background-color: ${COLORS.light_gray};
`;
const FollowerAccount = styled.div`
  display: grid;
  align-items: center;
  padding: 4px 0;
`;
const FollowerName = styled.span`
  color: ${COLORS.black};
  font-size: 14px;
  font-weight: 700;
`;
const FollowerId = styled.span`
  font-size: 12px;
`;
const BtnFollow = styled.button`
  align-self: center;
  width: 100%;
  padding: 7px 0;
  border-radius: 30px;
  background-color: ${COLORS.accent_green};
  color: #fff;
`;
const BtnCancel = styled.button`
  align-self: center;
  width: 100%;
  padding: 7px 0;
  border: ${BORDER.basic};
  border-radius: 30px;
`;
