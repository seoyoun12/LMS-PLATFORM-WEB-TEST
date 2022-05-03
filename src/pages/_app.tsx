import '@styles/reset.scss';
import '@styles/muiButton.scss';

import { AppProps } from 'next/app';
import { FC } from 'react';
import { ManagedUIContext } from '@components/ui';
import { RecoilRoot } from 'recoil';

const Noop: FC = ({ children }) => <>{children}</>;

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
