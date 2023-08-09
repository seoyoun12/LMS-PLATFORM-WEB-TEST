import React from 'react';
import Head from 'next/head';
import MainPage from '../layouts/MainPage/index';
import { Layout } from '@layouts/Layout';

export default function Home() {
  return <MainPage />
    
  
}

Home.Layout = Layout;
