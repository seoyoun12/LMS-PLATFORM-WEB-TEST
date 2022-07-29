import { Layout } from '@layouts/Layout';
import { SignInV2 } from '@layouts/Traffic/SignIn';
import Head from 'next/head';

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <SignInV2 />
    </>
  );
}

SignInPage.Layout = Layout;
