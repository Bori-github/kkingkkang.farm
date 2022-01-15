import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <meta
            property="og:url"
            content="https://futurama-fan-site.vercel.app/"
          /> */}
          <meta property="og:title" content="Kkingkkang Farm" />
          <meta property="og:description" content="Taste good Kkingkkang" />
          <meta property="og:image" content="/vercel.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
