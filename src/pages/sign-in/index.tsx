import { Layout } from '@layouts/Layout';
import { SignIn } from '@layouts/SignIn';
import Head from 'next/head';

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <SignIn/>
    </>
  );
}

SignInPage.Layout = Layout;
