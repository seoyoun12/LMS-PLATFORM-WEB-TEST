import { Category } from '@layouts/Category';
import { Layout } from '@layouts/Layout';
import Head from 'next/head';

export default function CategoryPage() {
  return (
    <>
      <Head>
        <title>충남도로교통연수원</title>
      </Head>
      <Category />
    </>
  );
}

CategoryPage.Layout = Layout;
