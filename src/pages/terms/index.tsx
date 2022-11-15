import { Layout } from '@layouts/Layout';
import SubPage from '@layouts/SubPage';
import Terms from '@layouts/Terms';
import Head from 'next/head';

export default function TermsPage() {
  return (
    <>
      <Terms />
    </>
  );
}

TermsPage.Layout = Layout;
