import { Layout } from '@layouts/Layout';
import { Steb3 } from '@layouts/Steb';
import { Box } from '@mui/material';
import styles from '@styles/common.module.scss';
import Head from 'next/head';

export default function Steb3Page() {
  return (
    <Box>
      <Head>
        <title>Steb3 Page</title>
      </Head>
      <Steb3 />
    </Box>
  );
}

Steb3Page.Layout = Layout;
