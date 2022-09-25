import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyles } from '../styles/globals';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>낑깡팜</title>
        <meta name="title" content="낑깡팜" />
        <meta
          name="description"
          content="내 일상을 공유하는 소셜 네트워크 서비스. 판매 상품을 등록하여 홍보도 할 수 있어요!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kkingkkang-farm.vercel.app/" />
        <meta property="og:title" content="낑깡팜" />
        <meta
          property="og:description"
          content="내 일상을 공유하는 소셜 네트워크 서비스. 판매 상품을 등록하여 홍보도 할 수 있어요!"
        />
        <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />
      </Head>
      <Global styles={GlobalStyles} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
