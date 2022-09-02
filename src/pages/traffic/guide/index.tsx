import { Guide } from '@layouts/Traffic/Guide';
import { Layout } from '@layouts/Layout';
import Head from 'next/head';

export default function GuidePage() {
  return (
    <>
      <Head>
        <title>충남도로교통연수원</title>
      </Head>
      <Guide />
    </>
  );
}

GuidePage.Layout = Layout;
