import '@styles/reset.scss';
import '@styles/muiButton.scss';
import '@styles/palette.scss';

import { AppProps } from 'next/app';
import { ManagedUIContext } from '@components/ui';
import { RecoilRoot } from 'recoil';
import { ReactNode } from 'react';
import * as React from 'react';

const Noop = ({ children }: { children: ReactNode }) => <>{children}</>;

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  return (
    <RecoilRoot>
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </RecoilRoot>
  );
}
