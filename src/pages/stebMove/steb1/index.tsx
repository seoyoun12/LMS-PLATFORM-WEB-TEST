import { Layout } from '@layouts/Layout';
// import { Steb1 } from '@layouts/Steb';
import { Box, Container } from '@mui/material';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Steb1 = dynamic(() => import('@layouts/Steb/Steb1/Steb1'), {
  ssr: false,
});

export default function Steb1Page() {
  return (
    <Box>
      <Head>
        <title>충남도로교통연수원</title>
      </Head>
      <Steb1 />
    </Box>
  );
}

Steb1Page.Layout = Layout;
