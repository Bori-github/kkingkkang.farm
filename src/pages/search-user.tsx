import styled from '@emotion/styled';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ChangeEventHandler, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Loader } from '../components/common/Loader';
import { Navigation } from '../components/layouts/Navigation';
import { ToolBar } from '../components/layouts/ToolBar';
import { UserAvatar } from '../components/UserAvatar';
import { API_ENDPOINT, USER_AVATAR } from '../constants';
import { GRAY_200, GRAY_400, GRAY_900 } from '../constants/colors';
import { UserData } from '../types/UserData';
import { fetcher } from '../utils';

const SearchUser: NextPage = () => {
  const [userList, setUserList] = useState<UserData[]>([]);

  const { data, error } = useSWR(`${API_ENDPOINT}/user`, fetcher);

  // useEffect(() => {
  //   console.log(data);
  // }, []);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const filteredData = data.filter((user: UserData) => {
      const { accountname } = user;
      return accountname.includes(e.target.value);
    });

    setUserList(filteredData);
  };

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <>
      <Head>
        <title>계정 검색ㅣ낑깡팜</title>
      </Head>
      <ToolBar title="">
        <Input type="search" placeholder="계정 검색" onChange={handleSearch} />
      </ToolBar>
      <MainSearch>
        <ListUser>
          {userList &&
            userList.map((user) => {
              const { _id, accountname, username, image } = user;
              return (
                <li key={`user-list-${_id}`}>
                  <Link href="/" passHref>
                    <LinkUser>
                      <UserAvatar
                        size={USER_AVATAR.md.size}
                        src={
                          image?.length > 0 ? image : '/default-profile-w.png'
                        }
                      />
                      <UserAccount>
                        <UserName>{username}</UserName>
                        <UserId>@{accountname}</UserId>
                      </UserAccount>
                    </LinkUser>
                  </Link>
                </li>
              );
            })}
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

const Input = styled.input`
  width: 100%;
  padding: 8px 16px;
  border: 0;
  background-color: ${GRAY_200};
  border-radius: 32px;

  &::placeholder {
    color: ${GRAY_400};
  }
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

const UserAccount = styled.div`
  display: grid;
  align-items: center;
  padding: 4px 0;
`;

const UserName = styled.span`
  color: ${GRAY_900};
  font-size: 14px;
  font-weight: 700;
`;

const UserId = styled.span`
  font-size: 12px;
`;
