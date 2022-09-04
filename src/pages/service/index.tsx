import { Layout } from '@layouts/Layout';
import { Service } from '@layouts/Service';
import Head from 'next/head';

export default function ServicePage() {
  return (
    <>
      <Head>
        <title>충남교통연수원</title>
      </Head>
      <Service />
    </>
  );
}

ServicePage.Layout = Layout;
