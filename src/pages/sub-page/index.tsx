import { Layout } from '@layouts/Layout';
import SubPage from '@layouts/SubPage';
import Head from 'next/head';

export default function SubHome() {
  return (
    <>
      <Head>
        <title>충남교통연수원</title>
      </Head>
      <SubPage />
    </>
  );
}

SubHome.Layout = Layout;
