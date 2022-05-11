import { Layout } from '@layouts/Layout';
import Head from 'next/head';
import { Content } from '@layouts/Content';

export default function ContentPage() {
  return (
    <>
      <Head>
        <title>Content Page</title>
      </Head>
      <Content/>
    </>
  );
}

ContentPage.Layout = Layout;
