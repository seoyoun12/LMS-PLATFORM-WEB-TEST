import '@styles/reset.scss';
import '@styles/muiButton.scss';
import '@styles/palette.scss';
import '../../styles/font.css';
// import '../../styles/card01.css';
import '../../styles/card02.css';

import { AppProps } from 'next/app';
import { ManagedUIContext } from '@components/ui';
import { RecoilRoot } from 'recoil';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Card } from '@material-ui/core';

const Noop = ({ children }: { children: ReactNode }) => <>{children}</>;

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  // const Help = dynamic(
  //   () =>
  //     Promise.resolve(() => {
  //       if (typeof window !== 'undefined') {
  //         if (localStorage.getItem('site_admin_type') === 'Y'){
  //           return (
  //           <Layout pageProps={pageProps}>
  //               <Component {...pageProps} />
  //           </Layout>
  //           );
  //           }
  //         else {
  //           return <div style={{position:'relative', width:'100vw' , height:'100vh' , background:'#06062c'}} >
  //             <Image src={'https://kr.object.gov-ncloudstorage.com/cn-lms-storage/resource/underconstruction.png'} layout='fill' />
  //             </div>
  //         }
  //       }
  //     }),
  //   { ssr: false }
  // );

  return (
    <RecoilRoot>
      <ManagedUIContext>
        {/* <Help/> */}
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </RecoilRoot>
  );
}
