import { Layout } from '@layouts/Layout';
import { Service } from '@layouts/Traffic/Service';
import Head from 'next/head';

export default function ServicePage() {
  return (
    <>
      <Head>
        <title>충남도로교통연수원</title>
      </Head>
      <Service />
    </>
  );
}

ServicePage.Layout = Layout;
