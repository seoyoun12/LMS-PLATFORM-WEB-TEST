import { Layout } from '@layouts/Layout';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Steb1 = dynamic(() => import('@layouts/Steb/Steb1/Steb1'), {
  ssr: false,
});

export default function Steb1Page() {
  return (
    <>
      <Head>
        <title>충남교통연수원</title>
      </Head>
      <Steb1 />
    </>
  );
}

Steb1Page.Layout = Layout;
