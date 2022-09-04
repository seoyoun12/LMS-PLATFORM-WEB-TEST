import { ServerStyleSheets } from '@material-ui/core';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';

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
        {/* <Head>{redirectIEToEdge()}</Head> */}
        <Head>
          <title>충남교통연수원</title>
          {/* <style id="jss-server-side">${css}</style> */}
          {redirectIEToEdge()}
        </Head>
        <body className="loading">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

// MyDocument.getInitialProps = async ctx => {
//   const materialSheets = new ServerStyleSheets();
//   const originalRenderPage = ctx.renderPage;

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: App => props => materialSheets.collect(<App {...props} />),
//     });

//   const initialProps = await Document.getInitialProps(ctx);
//   return {
//     ...initialProps,
//     styles: <>{initialProps.styles}</>,
//   };
// };
