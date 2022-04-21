import Head from 'next/head';
import MainPage from '../layouts/MainPage/index';
import { Layout } from '@layouts/Layout';
import { useEffect } from 'react';
import { getProfile, healthCheck } from '@common/test';

export default function Home() {
  useEffect(() => {
    (async () => {
      const hi = await healthCheck();
      // console.log(hi);
    })();
  });

  useEffect(() => {
    (async () => {
      const hi = await getProfile();
      // console.log(hi);
    })();
  });

  return (
    <>
      <Head>
        <title>TITLE</title>
        <meta name="description" content="lms platform service"/>
      </Head>
      <MainPage/>
    </>
  );
}

Home.Layout = Layout;
