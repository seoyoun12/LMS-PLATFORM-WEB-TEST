import Head from 'next/head';
import MainPage from '../layouts/MainPage/index';
import { GetServerSideProps } from 'next';
import { getCurrentForecast } from '../common/api/test';
import { useEffect, useState } from 'react';
import { data } from 'browserslist';
import { axios } from '@common/httpClient';

const API_KEY = 'f14d909bd5b9daee0e3e7b68e05f848a';

export default ({ title }) => {
  const [ movie, setMovie ] = useState();

  useEffect(() => {
    (async () => {
      const data = await (
        await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        )
      );

      console.log('data', data);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>TITLE</title>
        <meta name="description" content="lms platform service"/>
      </Head>
      <MainPage/>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  try {
    console.log('success');
    // const result = await getCurrentForecast().then(res => console.log(res));
    return {
      props: {
        title: ''
      }
    };
  } catch {
    console.log('err');
    return {
      props: {}
    };
  }
};

