import { Layout } from '@layouts/Layout';
// import { Steb3 } from '@layouts/Steb';
import { Box } from '@mui/material';
import styles from '@styles/common.module.scss';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Steb3 = dynamic(() => import('@layouts/Steb/Steb3/Steb3'), {
  ssr: false,
});

export default function Steb3Page() {
  return (
    <Box>
      <Head>
        <title>충남도로교통연수원</title>
      </Head>
      <Steb3 />
    </Box>
  );
}

Steb3Page.Layout = Layout;
