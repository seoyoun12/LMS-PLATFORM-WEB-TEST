import { Guide } from '@layouts/Traffic/Guide';
import { Layout } from '@layouts/Layout';
import Head from 'next/head';

export default function GuidePage() {
  return (
    <>
      <Head>
        <title>Guide Page</title>
      </Head>
      <Guide />
    </>
  );
}

GuidePage.Layout = Layout;