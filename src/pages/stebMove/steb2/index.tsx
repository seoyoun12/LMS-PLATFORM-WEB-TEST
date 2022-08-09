import { Layout } from '@layouts/Layout';
import { Steb2 } from '@layouts/Steb';
import { Box } from '@mui/material';
import styles from '@styles/common.module.scss';
import Head from 'next/head';

export default function Steb2Page() {
  return (
    <Box>
      <Head>
        <title>Steb2 Page</title>
      </Head>
      <Steb2 />
    </Box>
  );
}

Steb2Page.Layout = Layout;
