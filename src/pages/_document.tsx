import Document, { Head, Html, Main, NextScript } from 'next/document';

// const sheets = new ServerStyleSheets();
// const css = sheets.toString();
const redirectIEToEdge = () => {
  const recommendEdgeUrl =
    'https://support.microsoft.com/office/160fa918-d581-4932-9e4e-1075c4713595';
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
        window.location = 'microsoft-edge:' + window.location;
        setTimeout(function() {
          window.location = '${recommendEdgeUrl}';
        }, 1);
      }`,
      }}
    ></script>
  );
};

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          {redirectIEToEdge()}
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

