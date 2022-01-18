import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { HeaderListFollowers } from '../components/layouts/Header';
import { Navigation } from '../components/layouts/Navigation';

const ListFollowers: NextPage = () => {
  return (
    <>
      <Head>
        <title>팔로워ㅣ낑깡팜</title>
      </Head>
      <HeaderListFollowers />
      <main>
        <ul>
          <li>
            <Link href="/" passHref>
              <a>
                <img src="/default-profile-w.png" alt="사용자 프로필 이미지" />
                <div>
                  <span>애월읍 위니브 농장</span>
                  <span>@weniv_Mandarin</span>
                </div>
                <button type="button">팔로우</button>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <a>
                <img src="/default-profile-w.png" alt="사용자 프로필 이미지" />
                <div>
                  <span>애월읍 위니브 농장</span>
                  <span>@weniv_Mandarin</span>
                </div>
                <button type="button">취소</button>
              </a>
            </Link>
          </li>
        </ul>
      </main>
      <Navigation />
    </>
  );
};

export default ListFollowers;
