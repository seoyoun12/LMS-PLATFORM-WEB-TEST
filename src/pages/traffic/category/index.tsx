import { Category } from '@layouts/Traffic/Category';
import { Layout } from '@layouts/Layout';
import Head from 'next/head';

export default function CategoryPage() {
  return (
    <>
      <Head>
        <title>Category Page</title>
      </Head>
      <Category />
    </>
  );
}

CategoryPage.Layout = Layout;
