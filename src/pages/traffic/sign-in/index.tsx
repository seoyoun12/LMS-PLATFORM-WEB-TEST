import { Layout } from '@layouts/Layout';
import { SignInV2 } from '@layouts/Traffic/SignIn';
import Head from 'next/head';

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>충남도로교통연수원</title>
      </Head>
      <SignInV2 />
    </>
  );
}

SignInPage.Layout = Layout;
