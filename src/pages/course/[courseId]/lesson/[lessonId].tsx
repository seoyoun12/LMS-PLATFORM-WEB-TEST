import { Layout } from '@layouts/Layout';
import Head from 'next/head';
import { Lesson } from '@layouts/Content';

export default function LessonPage() {
  return (
    <>
      <Head>
        <title>Lesson Page</title>
      </Head>
      <Lesson />
    </>
  );
}

LessonPage.Layout = Layout;
