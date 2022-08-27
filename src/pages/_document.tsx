import { ServerStyleSheets } from '@material-ui/core';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';

// const sheets = new ServerStyleSheets();
// const css = sheets.toString();

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>{/* <style id="jss-server-side">${css}</style> */}</Head>
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
