import { Category } from '@layouts/Traffic/Category';
import { Layout } from '@layouts/Layout';
import Head from 'next/head';

export default function CategoryPage() {
  return (
    <>
      <Head>
        <title>충남교통연수원</title>
      </Head>
      <Category />
    </>
  );
}

CategoryPage.Layout = Layout;
