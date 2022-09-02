import { Layout } from '@layouts/Layout';
import { Steb3 } from '@layouts/Traffic/Steb';
import { Container } from '@mui/material';
import styles from '@styles/common.module.scss';
import Head from 'next/head';

export default function Steb3Page() {
  return (
    <Container className={styles.globalContainer}>
      <Head>
        <title>충남도로교통연수원</title>
      </Head>
      <Steb3 />
    </Container>
  );
}

Steb3Page.Layout = Layout;
