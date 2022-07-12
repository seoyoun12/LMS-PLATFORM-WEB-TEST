import { Layout } from '@layouts/Layout';
import SubPage  from '@layouts/SubPage';
import Head from 'next/head';

export default function SubHome() {
  return (
    <>
      <Head>
        <title>SubPage</title>
      </Head>
      <SubPage/>
    </>
  );
}

SubHome.Layout = Layout;
