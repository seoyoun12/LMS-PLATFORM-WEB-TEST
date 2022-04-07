import type { NextPage } from 'next';
import styles from '@styles/common.module.scss';
import * as React from 'react';
import Button from '@mui/material/Button';

const MainPage: NextPage = (res) => {
  return (
    <div className={styles.globalContainer}>
      <Button color='secondary' variant='contained'>Welcome to Mirim</Button>
    </div>
  );
};

export default MainPage;
