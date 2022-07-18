import { Layout } from '@layouts/Layout';
import { MakeAll } from '@layouts/MakeAll'
import Head from 'next/head';

export default function MakeAllPage() {

  return (

    <>
    
      <Head>

        <title>MakeAll Page</title>

      </Head>

      <MakeAll/>

    </>

  )

}

MakeAllPage.Layout = Layout;