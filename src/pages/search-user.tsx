import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { HeaderSearch } from '../components/layouts/Header';
import { Navigation } from '../components/layouts/Navigation';

const SearchUser: NextPage = () => {
  return (
    <>
      <Head>
        <title>계정 검색ㅣ낑깡팜</title>
      </Head>
      <HeaderSearch />
      <main>
        <ul>
          <li>
            <Link href="/">
              <a>
                <img src="/default-profile-w.png" alt="사용자 프로필 이미지" />
                <div>
                  <span className="user-name">애월읍 위니브 농장</span>
                  <span className="user-id">@weniv_Mandarin</span>
                </div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <img src="/default-profile-w.png" alt="사용자 프로필 이미지" />
                <div>
                  <span className="user-name">애월읍 위니브 농장</span>
                  <span className="user-id">@weniv_Mandarin</span>
                </div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>
                <img src="/default-profile-w.png" alt="사용자 프로필 이미지" />
                <div>
                  <span className="user-name">애월읍 위니브 농장</span>
                  <span className="user-id">@weniv_Mandarin</span>
                </div>
              </a>
            </Link>
          </li>
        </ul>
      </main>
      <Navigation />
    </>
  );
};

export default SearchUser;
