import Head from 'next/head';
import MainPage from '../layouts/MainPage/index';
import { Layout } from '@layouts/Layout';
import { useEffect } from 'react';
import { getProfile, healthCheck } from '@common/test';
import * as React from 'react';
// import { FileUpload, FileUpload2 } from '@components/ui/FileUploader';

export default function Home() {
  // useEffect(() => {
  //   (async () => {
  //     const loadHealthCheck = await healthCheck();
  //     console.log(loadHealthCheck);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const profile = await getProfile();
      } catch (e) {
        console.log('e', e);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>TITLE</title>
        <meta name="description" content="lms platform service" />
      </Head>
      {/*<FileUpload />*/}
      {/*<FileUpload2 />*/}
      <MainPage />
    </>
  );
}

Home.Layout = Layout;
