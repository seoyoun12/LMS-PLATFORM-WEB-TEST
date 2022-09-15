import { Layout } from '@layouts/Layout';
import { Steb3 } from '@layouts/Traffic/Steb';
import { Box, Container } from '@mui/material';
import styles from '@styles/common.module.scss';
import Head from 'next/head';

export default function Steb3Page() {
  return (
    <Box>
      <Head>
        <title>충남교통연수원</title>
      </Head>
      <Steb3 />
    </Box>
  );
}

Steb3Page.Layout = Layout;
