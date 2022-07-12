import { CNCalendar } from '@layouts/Calendar/Calendar';
import { Layout } from '@layouts/Layout';
import { Container } from '@mui/material';
import styles from '@styles/common.module.scss';
import Head from 'next/head';

export default function CalendarPage() {

  return (
    <Container className={styles.globalContainer}>
      <Head>
        <title>Calendar Page</title>
      </Head>
      <CNCalendar />
    </Container> 
  )
}

CalendarPage.Layout = Layout;
