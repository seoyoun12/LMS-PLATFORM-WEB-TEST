import { Layout } from '@layouts/Layout';
import { Steb1 } from '@layouts/Steb';
import { Box, Container } from '@mui/material';
import styles from '@styles/common.module.scss';
import Head from 'next/head';

export default function Steb1Page() {

  return (
    <Box>
      <Head>
        <title>Steb1 Page</title>
      </Head>
      <Steb1 />
    </Box> 
  )
}

Steb1Page.Layout = Layout;
