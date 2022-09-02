import { Layout } from '@layouts/Layout';
import Head from 'next/head';
import { Course } from '@layouts/Course';

export default function CoursePage() {
  return (
    <>
      <Head>
        <title>충남도로교통연수원</title>
      </Head>
      <Course />
    </>
  );
}

CoursePage.Layout = Layout;
