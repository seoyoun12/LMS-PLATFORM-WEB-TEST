import { Layout } from '@layouts/Layout';
import { Steb1 } from '@layouts/Traffic/Steb';
import { Container } from '@mui/material';
import styles from '@styles/common.module.scss';
import Head from 'next/head';

export default function Steb1Page() {
  return (
    <Container className={styles.globalContainer}>
      <Head>
        <title>충남교통연수원</title>
      </Head>
      <Steb1 />
    </Container>
  );
}

Steb1Page.Layout = Layout;
