import { Layout } from '@layouts/Layout';
import { Steb2 } from '@layouts/Traffic/Steb';
import { Container } from '@mui/material';
import styles from '@styles/common.module.scss';
import Head from 'next/head';

export default function Steb2Page() {
  return (
    <Container className={styles.globalContainer}>
      <Head>
        <title>충남도로교통연수원</title>
      </Head>
      <Steb2 />
    </Container>
  );
}

Steb2Page.Layout = Layout;
