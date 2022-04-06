import Head from 'next/head';
import MainPage from '../layouts/MainPage/index';
import { GetServerSideProps } from 'next';
import axios from 'axios';

const API_KEY = 'f14d909bd5b9daee0e3e7b68e05f848a';

export default ({ title }) => {
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

export async function getServerSideProps({ params }) {
  try {
    console.log('success');
    const result = await axios(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
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
}

