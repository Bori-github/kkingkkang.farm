import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEventHandler, ReactElement, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Loader } from '../../components/common/Loader';
import { Layout } from '../../components/layouts/Layout';
import { Navigation } from '../../components/layouts/Navigation';
import { ToolBar } from '../../components/layouts/ToolBar';
import { UserAvatar } from '../../components/UserAvatar';
import { API_ENDPOINT, USER_AVATAR } from '../../constants';
import { GRAY_200, GRAY_400, GRAY_900, PRIMARY } from '../../constants/colors';
import { UserData } from '../../types/UserData';
import { fetcher } from '../../utils';
import { NextPageWithLayout } from '../_app';

const SearchUser: NextPageWithLayout = () => {
  const router = useRouter();
  const token = Cookies.get('token');
  const [keyword, setKeyword] = useState<string>('');
  const [userList, setUserList] = useState<UserData[]>([]);

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, []);

  const { data, error } = useSWR(`${API_ENDPOINT}/user`, fetcher);

  let timer: NodeJS.Timeout | null;
  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;

        const filteredData = data?.filter(
          (user: UserData) =>
            e.target.value.length > 0 && user.username.includes(e.target.value),
        );

        setKeyword(e.target.value);
        setUserList(filteredData);
      }, 1000);
    }
  };

  const handleHighlight = (username: string) => {
    if (username.includes(keyword)) {
      return (
        <>
          {username.split(keyword)[0]}
          <HightlightedUserName>{keyword}</HightlightedUserName>
          {username.split(keyword)[1]}
        </>
      );
    }
    return username;
  };

  if (!data) return <Loader height="calc(100vh - 109px)" />;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <>
      <Head>
        <title>계정 검색ㅣ낑깡팜</title>
      </Head>
      <ToolBar title="">
        <Input type="text" placeholder="계정 검색" onChange={handleSearch} />
      </ToolBar>
      <MainSearch>
        <ListUser>
          {userList &&
            userList.map((user) => {
              const { _id, accountname, username, image } = user;
              return (
                <UserContainer key={`user-list-${_id}`}>
                  <UserAvatar
                    size={USER_AVATAR.md.size}
                    src={image?.length > 0 ? image : '/default-profile-w.png'}
                    accountName={accountname}
                  />
                  <UserAccount>
                    <UserName>{handleHighlight(username)}</UserName>
                    <UserId>@{accountname}</UserId>
                  </UserAccount>
                </UserContainer>
              );
            })}
        </ListUser>
      </MainSearch>
    </>
  );
};

SearchUser.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
      <Navigation />
    </Layout>
  );
};

export default SearchUser;

const MainSearch = styled.main`
  margin: 49px 0 60px;
  padding: 0 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 4px 16px;
  border: 0;
  background-color: ${GRAY_200};
  border-radius: 24px;

  &::placeholder {
    color: ${GRAY_400};
  }
`;

const ListUser = styled.ul`
  overflow-y: auto;
  display: grid;
  gap: 15px;
  padding: 20px 0;
`;

const UserContainer = styled.li`
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

const HightlightedUserName = styled.span`
  color: ${PRIMARY};
`;

const UserId = styled.span`
  font-size: 12px;
`;
