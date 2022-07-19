import { Layout } from '@layouts/Layout';
import { Steb2 } from '@layouts/Steb';
import { Container } from '@mui/material';
import styles from '@styles/common.module.scss';
import Head from 'next/head';

export default function Steb2Page() {
  return (
    <Container className={styles.globalContainer}>
      <Head>
        <title>Steb2 Page</title>
      </Head>
      <Steb2 />
    </Container>
  );
}

Steb2Page.Layout = Layout;
