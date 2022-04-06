import type { GetServerSideProps, NextPage } from 'next';
import styles from '@styles/common.module.scss';

const MainPage: NextPage = (res) => {
  return (
    <div className={styles.globalContainer}>
      <h1>Welcome to Mirim</h1>
    </div>
  );
};

export default MainPage;
