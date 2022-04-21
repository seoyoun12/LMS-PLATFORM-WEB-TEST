import Head from 'next/head';
import MainPage from '../layouts/MainPage/index';
import { Layout } from '@layouts/Layout';
import { useEffect } from 'react';
import { getProfile, healthCheck } from '@common/test';

export default function Home() {
  useEffect(() => {
    (async () => {
      const loadHealthCheck = await healthCheck();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const profile = await getProfile();
    })();
  }, []);

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
