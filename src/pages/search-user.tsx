import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { HeaderSearch } from '../components/layouts/Header';
import { Navigation } from '../components/layouts/Navigation';
import { COLORS } from '../constants';

const SearchUser: NextPage = () => {
  return (
    <>
      <Head>
        <title>계정 검색ㅣ낑깡팜</title>
      </Head>
      <HeaderSearch />
      <MainSearch>
        <ListUser>
          <li>
            <Link href="/" passHref>
              <LinkUser>
                <ImgUser
                  src="/default-profile-w.png"
                  alt="사용자 프로필 이미지"
                />
                <UserAccount>
                  <UserName>애월읍 위니브 농장</UserName>
                  <UserId>@weniv_Mandarin</UserId>
                </UserAccount>
              </LinkUser>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <LinkUser>
                <ImgUser
                  src="/default-profile-w.png"
                  alt="사용자 프로필 이미지"
                />
                <UserAccount>
                  <UserName>애월읍 위니브 농장</UserName>
                  <UserId>@weniv_Mandarin</UserId>
                </UserAccount>
              </LinkUser>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <LinkUser>
                <ImgUser
                  src="/default-profile-w.png"
                  alt="사용자 프로필 이미지"
                />
                <UserAccount>
                  <UserName>애월읍 위니브 농장</UserName>
                  <UserId>@weniv_Mandarin</UserId>
                </UserAccount>
              </LinkUser>
            </Link>
          </li>
        </ListUser>
      </MainSearch>
      <Navigation />
    </>
  );
};

export default SearchUser;

const MainSearch = styled.main`
  margin: 49px 0 60px;
  padding: 0 16px;
`;

const ListUser = styled.ul`
  display: grid;
  gap: 15px;
  padding: 20px 0;
`;
const LinkUser = styled.a`
  display: grid;
  grid-template-columns: 50px auto;
  gap: 10px;
`;
const ImgUser = styled.img`
  width: 40px;
  padding: 5px;
  border-radius: 50%;
  background-color: ${COLORS.light_gray};
`;
const UserAccount = styled.div`
  display: grid;
  align-items: center;
  padding: 4px 0;
`;
const UserName = styled.span`
  color: ${COLORS.black};
  font-size: 14px;
  font-weight: 700;
`;
const UserId = styled.span`
  font-size: 12px;
`;
