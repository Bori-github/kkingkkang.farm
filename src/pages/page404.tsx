import { NextPage } from 'next';
import Head from 'next/head';

const Page404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404: This page could not found.ㅣ낑깡팜</title>
      </Head>
      <main>
        <img src="/logo/logo-404.png" alt="404" />
        <p>페이지를 찾을 수 없습니다. &#58;&#40;</p>
        <button type="button">이전 페이지</button>
      </main>
    </>
  );
};

export default Page404;
