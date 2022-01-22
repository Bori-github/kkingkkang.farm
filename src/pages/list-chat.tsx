import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { HeaderUserPage } from '../components/layouts/Header';
import { Navigation } from '../components/layouts/Navigation';

const ListChat: NextPage = () => {
  return (
    <>
      <Head>
        <title>채팅ㅣ낑깡팜</title>
      </Head>
      <HeaderUserPage />
      <main>
        <div>
          <Link href="/">
            <a>
              <div>
                <img src="/default-profile-w.png" alt="사용자 프로필 이미지" />
                <div className="unread">
                  <span className="sr-only">읽지 않은 채팅</span>
                </div>
              </div>
              <div>
                <span>애월읍 위니브 감귤 농장</span>
                <p className="sl-ellipsis">이번에 정정 언제하맨마씸?</p>
              </div>
              <span>2020.10.25</span>
            </a>
          </Link>
          <Link href="/">
            <a>
              <div>
                <img src="/default-profile-w.png" alt="사용자 프로필 이미지" />
                <div className="unread">
                  <span className="sr-only">읽지 않은 채팅</span>
                </div>
              </div>
              <div>
                <span>제주감귤마을</span>
                <p className="sl-ellipsis">
                  안녕하세요. 감귤 사고싶어요요요요요
                </p>
              </div>
              <span>2020.10.25</span>
            </a>
          </Link>
          <Link href="/">
            <a>
              <div>
                <img src="/default-profile-w.png" alt="사용자 프로필 이미지" />
                <div className="unread">
                  <span className="sr-only">읽지 않은 채팅</span>
                </div>
              </div>
              <div>
                <span>누구네 농장 친환경 한라봉</span>
                <p className="sl-ellipsis">
                  옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여,
                  뿐이다.
                </p>
              </div>
              <span>2020.10.25</span>
            </a>
          </Link>
        </div>
      </main>
      <Navigation />
    </>
  );
};

export default ListChat;
