import { Layout } from '@layouts/Layout';
import { Box } from '@mui/material';
import styles from '@styles/common.module.scss';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Steb2 = dynamic(() => import('@layouts/Steb/Steb2/Steb2'), {
  ssr: false,
});

export default function Steb2Page() {
  return (
    <Box>
      <Head>
        <title>충남도로교통연수원</title>
      </Head>
      <Steb2 />
    </Box>
  );
}

Steb2Page.Layout = Layout;
