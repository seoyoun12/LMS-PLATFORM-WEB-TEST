import { Layout } from '@layouts/Layout';
import Head from 'next/head';
import { Course } from '@layouts/Course';

export default function CoursePage() {
  return (
    <>
      <Head>
        <title>Course Page</title>
      </Head>
      <Course/>
    </>
  );
}

CoursePage.Layout = Layout;
