import React from 'react';
import Head from 'next/head';
import { Layout } from '@layouts/Layout';
import ClassRoom from '@layouts/Traffic/ClassRoom';

export default function ClassRoomPage() {
  return (
    <>
      <Head>
        <title>충남교통연수원</title>
        <meta name="description" content="lms platform service" />
      </Head>
      <ClassRoom />
    </>
  );
}

ClassRoomPage.Layout = Layout;
