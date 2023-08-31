import { Layout } from '@layouts/Layout';
import { Box } from '@mui/material';


import dynamic from 'next/dynamic';
import Head from 'next/head';

const Step2 = dynamic(() => import('@layouts/Steb/Step2/Step2'), {
  ssr: false,
});

export default function Step2Page() {
  return (
    <Box>
      <Head>
        <title>충남교통연수원</title>
      </Head>
      <Step2 />
    </Box>
  );
}

Step2Page.Layout = Layout;


