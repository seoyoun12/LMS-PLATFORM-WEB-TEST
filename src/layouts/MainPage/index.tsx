import type { GetServerSideProps, NextPage } from 'next';
import styles from '../../../styles/Home.module.css';
import { useState } from 'react';
import { getCurrentForecast } from '../../common/api/test';

const MainPage: NextPage = (res) => {
  return (
    <div className={styles.container}>
      <img
        src="/assets/images/logo.png"
        width={144} // Desired size with correct aspect ratio
        alt="Your Name"
      />
      <h1>Welcome to Mirim</h1>
    </div>
  );
};

export default MainPage;
