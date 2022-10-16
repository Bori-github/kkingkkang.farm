import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import { Layout } from '../components/layouts/Layout';
import { GlobalStyles } from '../styles/globals';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={GlobalStyles} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
